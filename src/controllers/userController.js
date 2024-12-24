const User = require('../models/User');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt')
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 7, // Limitar a 5 tentativas
  message: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Validação dos dados de entrada
const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Função de criação de usuário
const createUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, password } = req.body;

  try {
    // Verifica se o e-mail já está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Este e-mail já está registrado!' });
    }

    // Cria o novo usuário se o e-mail não existir
    const user = await User.create({ name, email, password });

    res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};


// Função de login de usuário



const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclui o campo senha
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
};



const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar se o ID é válido (no caso do MongoDB)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    // Tentar deletar o usuário
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Usuário deletado com sucesso', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o usuário', error });
  }
};

const updateUser = async (req, res) => {
  const userId = req.user.id;  // Pegando o ID do usuário a partir do token JWT
  const { name, email, password } = req.body;  // Incluindo o email para atualização

  try {
    // Verificar se os dados foram fornecidos para atualização
    const updateData = {};

    // Validar o nome (se fornecido)
    if (name) {
      if (name.length < 3) {
        return res.status(400).json({ message: 'O nome deve ter pelo menos 3 caracteres.' });
      }
      updateData.name = name;
    }

    // Validar o email (se fornecido)
    if (email) {
      if (!email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ message: 'Por favor, forneça um e-mail válido.' });
      }

      // Verificar se já existe outro usuário com o mesmo e-mail
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: 'Este e-mail já está em uso.' });
      }
      updateData.email = email;
    }

    // Se a senha for fornecida, validá-la e criptografá-la
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
      }
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    // Atualiza o usuário no banco de dados
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Retorna o usuário atualizado sem a senha
    return res.status(200).json({
      message: 'Perfil atualizado com sucesso.',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,  // E-mail agora é permitido para atualização
        profileImage: updatedUser.profileImage,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o perfil.' });
  }
};




const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Pegando o id do usuário do objeto req.user
    const user = await User.findById(userId).select('-password'); // Excluindo a senha da resposta

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({
      name: user.name,
      email: user.email,
      createdAt: user.createdAt ? user.createdAt.toISOString() : null,
      profileImage: user.profileImage // Se você tiver esse campo
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter perfil do usuário', error: err.message });
  }
};


const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;
    const profileImage = req.file ? `uploads/${req.file.filename}` : null;

    if (!profileImage) {
      return res.status(400).json({ message: 'Nenhuma imagem foi enviada.' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.status(200).json({
      message: 'Imagem de perfil atualizada com sucesso.',
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar a imagem de perfil.' });
  }
};


async function forgotPassword(req, res) {
  const { email } = req.body;

  try {
      // Verificar se o usuário existe
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'Usuário não encontrado!' });
      }

      // Gerar um token único para recuperação
      const resetToken = crypto.randomBytes(32).toString('hex');

      // Salvar o token no banco de dados sem expiração
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = undefined; // Remover a expiração
      await user.save();

      // Configurar o transporte de e-mail (usando Nodemailer)
      const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS
        }
      });

      // Criar o link de recuperação
      const resetUrl = `http://localhost:3000/reset-password.html?token=${resetToken}`;


      // Enviar o e-mail
      const mailOptions = {
        to: email,
        from: 'f78199dc4d-054ad7@inbox.mailtrap.io', // Remetente
        subject: 'Recuperação de Senha',
        text: `Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:\n\n${resetUrl}`, // Versão texto
        html: `  
          <p>Você solicitou a recuperação de senha.</p>
          <p>Clique no link abaixo para redefinir sua senha:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>Se você não solicitou isso, ignore este e-mail.</p>
        ` // Versão HTML
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Link de recuperação enviado para o seu e-mail!' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao processar a solicitação de recuperação de senha.' });
  }
}



// Função para redefinir a senha com o token
// Função para redefinir a senha com o token
async function resetPassword(req, res) {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'As senhas não coincidem!' });
  }

  try {
    const user = await User.findOne({ resetPasswordToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Token inválido!' });
    }

    // Criptografar a senha manualmente
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Atualizar diretamente os campos no banco
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword,
          resetPasswordToken: undefined,
          resetPasswordExpires: undefined,
        },
      }
    );

    res.status(200).json({ message: 'Senha redefinida com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao redefinir a senha.' });
  }
}



// Função de login de usuário
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Aplicando o rate limiter antes de qualquer lógica de login
  loginRateLimiter(req, res, async () => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado!' });
      }

      // Comparar a senha inserida com o hash no banco
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Senha incorreta!' });
      }

      // Gerar o token JWT
      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Retorna o token
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao fazer login.', error: err.message });
    }
  });
};









module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserProfile, 
  updateProfileImage,
  forgotPassword, 
  resetPassword,
  loginRateLimiter,
};


