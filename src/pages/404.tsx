import Layout from "../components/Layout";

export default function NotFoundPage(): JSX.Element {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4 grid place-items-center grow">
        <div className="flex flex-col items-center">
          <a className="mb-4" href="https://emoji.gg/emoji/3397-cat-roll" rel="nofollow">
            <img src="https://cdn3.emoji.gg/emojis/3397-cat-roll.gif" className="w-20 h-20" alt="cat_roll"/>
          </a>
          <h1 className="text-6xl font-bold">404: Not found</h1>
          <p>
            {"Apologies, there's nothing here."}
          </p>
          <p>
            But the rolling cat is pretty cute, right?
          </p>
        </div>
      </div>
    </Layout>
  )
}