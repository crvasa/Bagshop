
export const sample_bags: any[] =[{
  
  id:1,
  name:'Summer Bag',
  price:35,
  workTime: '2 weeks',
  favorite: false,
  origins: ['cordino','estate'],
  description: `Porta con te un tocco di eleganza artigianale anche in spiaggia! La nostra borsa mare all'uncinetto,
     realizzata interamente a mano, è l’accessorio perfetto per le tue giornate al sole. 
     Capiente, resistente e leggera, è pensata per contenere tutto ciò che ti serve 
     dal telo mare al libro preferito.
     Il suo colore verde acqua richiama immediatamente il mare cristallino e aggiunge 
     un tocco di freschezza al tuo look estivo. Le lavorazioni all’uncinetto la rendono unica, 
     mentre i manici robusti assicurano praticità e comfort`,
  imageUrl: '/assets/images/bags/bag1.jpg',
  tags: ['homemade', 'cordino'],
 },
 {
  id:2,
  name:'Violet Bag',
  price:30,
  workTime: '5 weeks',
  favorite: true,
  origins: ['estate','fettuccia'],
   description: `Lasciati conquistare dalla delicatezza del lilla e dalla bellezza del fatto a mano. 
    Questa borsa all’uncinetto, abbastanza grande per accompagnarti ovunque, è l’accessorio ideale per chi cerca stile e praticità.
    Realizzata interamente a mano, combina un design artigianale unico con una struttura capiente, perfetta per portare con te tutto il necessario – dal portafoglio al libro, dalla borraccia al beauty case. 
    Il colore lilla dona un tocco romantico e femminile, perfetto per la primavera e l’estate.`,
  imageUrl: '/assets/images/bags/bag2.jpg',
  tags: ['homemade','cordino'],
 },
 {
  id:3,
  name:'Positive Bag',
  price: 15,
  workTime: '6 hours',
  favorite: false,
  origins: ['fettuccia', 'autunno'],
  description: `Un concentrato di stile in formato compatto! Questa mini borsa all’uncinetto, 
      realizzata a mano, è perfetta per chi ama i dettagli artigianali e un tocco di colore nel look quotidiano.
      Il blu intenso la rende elegante e versatile, adatta sia per il giorno che per la sera. Nonostante le dimensioni ridotte, è perfetta per contenere l’essenziale: 
      cellulare, chiavi e portacarte. Un accessorio leggero, pratico e dal carattere unico.`,
  imageUrl: '/assets/images/bags/bag3.jpg',
  tags: ['made', 'fettuccia'],
 },
 
 {
  id:4,
  name:'Rosa Bag',
  price: 20,
  workTime: '5 hours',
  favorite: true,
  origins: ['autunno'],
    description: `Piccola nelle dimensioni, grande nello stile. Questa borsetta all’uncinetto 
      fatta a mano è l’accessorio perfetto per aggiungere un tocco romantico e femminile al tuo look.
      Il colore rosa pastello la rende dolce e versatile, perfetta per portare con te l’essenziale 
      in ogni occasione: un rossetto, il cellulare, le chiavi. Ideale per cerimonie, 
      aperitivi o semplicemente per chi ama i dettagli artigianali e raffinati.`,
  imageUrl: '/assets/images/bags/bag4.jpg',
  tags: ['homemade','fettuccia'],
 },
 {
  id:5,
  name:'Autumn Bag',
  price:15,
  workTime: '2 days',
  favorite: true,
  origins: ['fettuccia','estate'],
  description: `Questa borsa all’uncinetto color bordeaux, fatta a mano con cura, unisce 
    stile e funzionalità in un unico accessorio senza tempo. 
    Le sue dimensioni standard la rendono perfetta per l’uso quotidiano: abbastanza 
    spaziosa per portare l’indispensabile, ma comoda da indossare ovunque.
    Il colore caldo e profondo richiama le sfumature dell’autunno, aggiungendo 
    un tocco di eleganza rustica al tuo outfit. Ideale per l’ufficio, lo shopping o le uscite di tutti i giorni.`,
  imageUrl: '/assets/images/bags/bag5.jpg',
  tags: ['made','fettuccia'],
 },
 {
  id:6,
  name:'Bag Aura',
  price: 25,
  workTime: '2 days',
  favorite: true,
  origins: ['cordino'],
  description: `Semplice, elegante e senza tempo. Questa borsa all’uncinetto marrone, 
    realizzata interamente a mano, è l’accessorio ideale per chi ama uno stile sobrio ma ricercato. 
    Le sue dimensioni standard la rendono perfetta per l’uso quotidiano: capiente al punto giusto, 
    comoda da portare con te in ogni occasione.
    Il colore marrone richiama la terra e la natura, donando calore e versatilità a qualsiasi look, 
    dal casual al boho chic.`,
  imageUrl: '/assets/images/bags/bag6.jpg',
  tags: ['homemade','cordino'],
 },
]
    
export const sample_tags: any[]=[
    {name: 'All', count: 6},
    {name: 'homemade', count: 4},
    {name: 'made', count: 2},
    {name: 'fettuccia', count: 2},
    {name: 'cordino', count: 3},
    {name: 'littlebag', count: 1},
  ]


  export const sample_users: any[]=[
    {
      name: "Fra Fake",
      email: "fraacc@gmail.com",
      password: "12345",
      address: "Mogliano",
      isAdmin: false,
    },
    {
      name: "Cri Diggi",
      email: "crvasa@gmail.com",
      password: "12345",
      address: "Grotta",
      isAdmin: true,
    }
  ];