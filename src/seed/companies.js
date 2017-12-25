const clients = [
  {
    id: '5b9462c3-bd11-4bd0-8937-7db762fb22c0',
    name: 'Wicotec Kirkebjerg A/S',
    cvrno: '73585511',
    type: 'opdragsgiver',
    clients: ['edaf7d39-985a-4396-85ff-d5a5d4450a16', 'b927d198-351f-4c5d-9054-424bf6fb7c94']
  },
  {
    id: '6714a515-bec0-4d2b-a5e4-76d16cb845c0',
    name: 'LE34',
    cvrno: '27758592',
    type: 'opdragsgiver',
    clients: ['0b67b5af-ed80-4860-9c49-864060d8ae25', 'b927d198-351f-4c5d-9054-424bf6fb7c94']
  },
  {
    id: '1ec75ea6-7022-4813-9e2d-2630003ea392',
    name: 'JFE A/S',
    cvrno: '74760716',
    type: 'opdragsgiver',
    clients: ['b428964d-13b3-4aea-91ad-4e32f3481959', '7282afcb-b458-4c6b-b57b-a5cb9e5a6a68', 'bd52f4a5-2cfe-4aff-a0dc-cca6e50f463b']
  },
  {
    id: 'edaf7d39-985a-4396-85ff-d5a5d4450a16',
    name: 'Albertslund Varmeværk',
    cvrno: '1003267160',
    type: 'slutbruger'
  },
  {
    id: 'b927d198-351f-4c5d-9054-424bf6fb7c94',
    name: 'Hvalsø Kraftvarmeværk',
    cvrno: '44057212',
    type: 'slutbruger'
  },
  {
    id: '0b67b5af-ed80-4860-9c49-864060d8ae25',
    name: 'Egedal Fjernvarme',
    cvrno: '35410538',
    type: 'slutbruger'
  },
  {
    id: '1d95ef7d-e51a-42f4-82fa-91b277f4c148',
    name: 'EnergiMidt',
    cvrno: '36423544',
    type: 'slutbruger'
  },
  {
    id: 'b428964d-13b3-4aea-91ad-4e32f3481959',
    name: 'Solrød Fjernvarme amba',
    cvrno: '23104113',
    type: 'slutbruger'
  },
  {
    id: '7282afcb-b458-4c6b-b57b-a5cb9e5a6a68',
    name: 'Rødovre Kommunale Fjernvarmeforsyning',
    cvrno: '6530731677',
    type: 'slutbruger'
  },
  {
    id: 'bd52f4a5-2cfe-4aff-a0dc-cca6e50f463b',
    name: 'Norfors I/S',
    cvrno: '14748539',
    type: 'slutbruger'
  },
  {
    id: '7c830e38-9903-44e6-98f7-7f79941b16ff',
    name: 'DONG',
    cvrno: '1234',
    type: 'slutbruger'
  },
  {
    id: 'c06ea06e-25b5-473e-80ec-abd894a27ddc',
    name: 'KE_Transmission',
    cvrno: '',
    type: 'opdragsgiver',
    clients: ['7c830e38-9903-44e6-98f7-7f79941b16ff']
  },
  {
    id: 'f4e2bbf9-55b7-4e59-9ff0-2155544fc1fe',
    name: 'Kemp_Lauritzen',
    cvrno: '',
    type: 'opdragsgiver',
    clients: ['7c830e38-9903-44e6-98f7-7f79941b16ff']
  },
  {
    id: 'aa160aff-b9be-4cdc-8590-fd203644c5e7',
    name: 'NCC',
    cvrno: '',
    type: 'opdragsgiver',
    clients: ['7c830e38-9903-44e6-98f7-7f79941b16ff']
  },
  {
    id: 'b9e22955-89ce-43e6-87f6-4de131436a22',
    name: 'Demo',
    cvrno: '',
    type: 'opdragsgiver',
    clients: ['7c830e38-9903-44e6-98f7-7f79941b16ff']
  },
  {
    id: '2e8df1dd-458d-4c8e-8498-7f79931b15ff',
    name: 'MTH',
    cvrno: '',
    type: 'opdragsgiver',
    clients: ['7c830e38-9903-44e6-98f7-7f79941b16ff']
  },
  {
    id: 'd78ae731-0026-46fd-be2b-c05e6663cfe5',
    name: 'Bravida',
    cvrno: '',
    type: 'opdragsgiver',
    clients: ['7c830e38-9903-44e6-98f7-7f79941b16ff']
  },
  {
    id: '020c4051-b910-438c-a50b-8a3fe1898fda',
    name: 'Nordkysten',
    cvrno: '',
    type: 'opdragsgiver',
    clients: ['7c830e38-9903-44e6-98f7-7f79941b16ff']
  },
  {
    id: '7c730e38-9903-44e6-98f7-9c32c87c9c03',
    name: 'Munck',
    cvrno: '',
    type: 'opdragsgiver',
    clients: ['7c830e38-9903-44e6-98f7-7f79941b16ff']
  }
]

module.exports = clients.map(client => {
  return {
    id: client.id,
    name: client.name,
    cvr: client.cvrno
  }
})
