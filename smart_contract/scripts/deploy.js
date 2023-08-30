const fs = require("fs");

const main = async () => {
  const propertyFactory = await hre.ethers.getContractFactory(
    "PropertyContract"
  );
  const propertyContract = await propertyFactory.deploy();

  await propertyContract.deployed();
  try {
    await fs.promises.copyFile(
      "artifacts/contracts/PropertyContract.sol/PropertyContract.json",
      "../client/src/utils/abi/PropertyContract.json"
    );
  } catch (error) {
    console.log(error);
  }

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
