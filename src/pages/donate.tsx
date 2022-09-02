import Layout from "../components/Layout";
import ThemeChanger from "../components/ThemeSwitcher";

export default function DonatePage(): JSX.Element {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4">
        Hello world!
        <ThemeChanger/>
      </div>
    </Layout>
  )
}