export default async function decorate(block) {
  const precon = [...block.children];

  precon.forEach((preconData) => {
    const [wdhContext, linkTab] = preconData.children;

    // console
    console.log(wdhContext, linkTab);
  });
}
