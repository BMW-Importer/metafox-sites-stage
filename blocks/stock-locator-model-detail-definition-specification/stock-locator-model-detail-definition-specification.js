export default async function decorate(block) {
  const modelDetails = [...block.children];
  modelDetails.forEach((modelDetail) => {
    const [general, analytics] = modelDetail.children;
    console.log(general, analytics);
  });
}
