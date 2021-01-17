import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>こんにちわ。まさゆきのブログサイトです。</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

// index.jsがビルドされるタイミングで、このページが事前にレンダリングされgetStaticPropsが実行される
// getStaticPropsの中でlib/posts.jsのgetSortedPostsDataが実行される
// getSortedPostsDataは、pre-rendering.mdなどのデータを取得して、
// 使いやすい形にしてソートしてgetStaticPropsに返している
// そのデータをallPostsDataとしてHomeコンポーネントに渡して、mapしてる。
//これはデータ有りの静的生成（サーバサイド）のお話
//このgetStaticPropsは、pagesディレクトリでのみ可能。getServersidePropsも
//getServersidePropsにしたい場合は、getStaticPropsをgetServersidePropsに変更するのみ

export async function getStaticProps() {  
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

//export async function getStaticProps() {}がなければCSRになる。
