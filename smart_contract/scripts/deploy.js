const main = async () => {
  
  const propertyFactory = await hre.ethers.getContractFactory("Property");
  const propertyContract = await propertyFactory.deploy();

  await propertyContract.deployed();

  console.log("PropertyContract address: ", propertyContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();