
const hre = require("hardhat");

async function main() {
  
  const JustApples = await hre.ethers.getContractFactory("JustApples");
  const justApples = await JustApples.deploy();

  await justApples.deployed();

  console.log("Justapples deployed to:", justApples.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
