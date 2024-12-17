import { individualCategory } from "@/firebase/category/read-server";

import { PostCards } from "@/app/components/header/allposts";

export default async function SelectedCategory({
  params,
}: {
  params: { categoriesId: number };
}) {
  const data = await individualCategory(params.categoriesId);

  return (
    <>
      <div className="flex mt-28 justify-center gap-8 flex-wrap">
        {data.length > 0 &&
          data.map((v) => {
            return <PostCards item={v} key={v.id} />;
          })}
      </div>
    </>
  );
}
