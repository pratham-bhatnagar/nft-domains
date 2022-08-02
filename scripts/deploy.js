const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("ezpz");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);
  const startEstimate = await domainContract.estimateGas.register("drip");

  let txn = await domainContract.register("drip", {
    value: hre.ethers.utils.parseEther(startEstimate),
  });
  await txn.wait();
  console.log("Minted domain drip.ezpz");

  txn = await domainContract.setRecord("drip", "just drip it");
  await txn.wait();
  console.log("Set record for drip.ezpz");

  const address = await domainContract.getAddress("drip");
  console.log("Owner of domain drip:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
