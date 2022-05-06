import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";

const QuestionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

const CardLink = styled.a`
  text-decoration: none;
`;

export async function getServerSideProps(context) {
  const { page } = context.query;

  const response = await fetch(
    `https://api.stackexchange.com/2.2/questions?${
      page ? `page=${page}&` : ""
    }site=stackoverflow&order=desc&sort=hot&tagged=reactjs`
  );

  const result = await response.json();

  return {
    props: {
      questions: result.items,
      hasMore: result.has_more,
      page: page || 1,
    },
  };
}

export default function Questions({ questions, hasMore, page }) {
  return (
    <>
      <Head>
        <title>Questions</title>
      </Head>
      <QuestionsContainer>
        <h2>Questions</h2>

        <>
          {questions &&
            questions.map((question) => (
              <Link
                key={question.question_id}
                href={`/questions/${question.question_id}`}
                passHref
              >
                <CardLink>
                  <Card
                    title={question.title}
                    views={question.view_count}
                    answers={question.answer_count}
                  />
                </CardLink>
              </Link>
            ))}
          <Pagination currentPage={parseInt(page) || 1} hasMore={hasMore} />
        </>
      </QuestionsContainer>
    </>
  );
}
