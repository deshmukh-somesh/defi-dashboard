// Pool Configuration
export const POOL_CONFIG = {
  lending: [
    "db678df9-3281-4bc2-a8bb-01160ffd6d48", // aave-v3
    "c1ca08e4-d618-415e-ad63-fcec58705469", // compound-v3  
    "8edfdf02-cdbb-43f7-bca6-954e5fe56813"  // maple
  ],
  liquidStaking: [
    "747c1d2a-c668-4682-b9f9-296708a3dd90", // lido
    "80b8bf92-b953-4c20-98ea-c9653ef2bb98", // binance-staked-eth
    "90bfb3c2-5d35-4959-a275-ba5085b08aa3"  // stader
  ],
  yieldAggregator: [
    "107fb915-ab29-475b-b526-d0ed0d3e6110", // cian-yield-layer
    "05a3d186-2d42-4e21-b1f0-68c079d22677", // yearn-finance
    "1977885c-d5ae-4c9e-b4df-863b7e1578e6"  // beefy
  ]
};

// Object.values(POOL_CONFIG) => 
// [
//   [
//     "db678df9-3281-4bc2-a8bb-01160ffd6d48", // aave-v3
//     "c1ca08e4-d618-415e-ad63-fcec58705469", // compound-v3  
//     "8edfdf02-cdbb-43f7-bca6-954e5fe56813"  // maple
//   ],
//   [
//     "747c1d2a-c668-4682-b9f9-296708a3dd90", // lido
//     "80b8bf92-b953-4c20-98ea-c9653ef2bb98", // binance-staked-eth
//     "90bfb3c2-5d35-4959-a275-ba5085b08aa3"  // stader
//   ],
//  [
//     "107fb915-ab29-475b-b526-d0ed0d3e6110", // cian-yield-layer
//     "05a3d186-2d42-4e21-b1f0-68c079d22677", // yearn-finance
//     "1977885c-d5ae-4c9e-b4df-863b7e1578e6"  // beefy
//   ]
// ]

// .flat()

//   [
//     "db678df9-3281-4bc2-a8bb-01160ffd6d48", // aave-v3
//     "c1ca08e4-d618-415e-ad63-fcec58705469", // compound-v3  
//     "8edfdf02-cdbb-43f7-bca6-954e5fe56813"  // maple
//   
//   
//     "747c1d2a-c668-4682-b9f9-296708a3dd90", // lido
//     "80b8bf92-b953-4c20-98ea-c9653ef2bb98", // binance-staked-eth
//     "90bfb3c2-5d35-4959-a275-ba5085b08aa3"  // stader
//   
//  
//     "107fb915-ab29-475b-b526-d0ed0d3e6110", // cian-yield-layer
//     "05a3d186-2d42-4e21-b1f0-68c079d22677", // yearn-finance
//     "1977885c-d5ae-4c9e-b4df-863b7e1578e6"  // beefy
//   ]

// .filter()

// Let's say you got these 4 pools after filtering (from your 9 configured pools)
// const filteredPools = [
//   { pool: "db678df9-3281-4bc2-a8bb-01160ffd6d48", protocol: "Aave V3", tvl: 1500000, apy: 4.2 },
//   { pool: "747c1d2a-c668-4682-b9f9-296708a3dd90", protocol: "Lido", tvl: 2000000, apy: 5.8 },
//   { pool: "05a3d186-2d42-4e21-b1f0-68c079d22677", protocol: "Yearn", tvl: 800000, apy: 7.1 },
//   { pool: "c1ca08e4-d618-415e-ad63-fcec58705469", protocol: "Compound V3", tvl: 900000, apy: 3.5 }
// ];

// const finalFilteredPools = [
//   { pool: "db678df9...", protocol: "Aave V3", tvl: 1500000, apy: 4.2, category: 'lending' },
//   { pool: "747c1d2a...", protocol: "Lido", tvl: 2000000, apy: 5.8, category: 'liquidStaking' },
//   { pool: "05a3d186...", protocol: "Yearn", tvl: 800000, apy: 7.1, category: 'yieldAggregator' },
//   { pool: "c1ca08e4...", protocol: "Compound V3", tvl: 900000, apy: 3.5, category: 'lending' }
// ];
