const system = {
  role: 'system',
  email: 'rut@le34.dk',
  password: process.env.PASSWORD || 'admin',
  isVerified: true,
  clientId: '6714a515-bec0-4d2b-a5e4-76d16cb845c0'
};

module.exports = [ system ];
