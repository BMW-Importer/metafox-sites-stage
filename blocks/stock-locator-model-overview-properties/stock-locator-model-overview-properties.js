export default async function decorate(block) {
  const modelOverview = [...block.children];
  modelOverview.forEach((overview) => {
    const [general, content] = overview.children;
    console.log(general, content);
  });
}
