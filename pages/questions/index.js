import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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

export default function Questions() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.stackexchange.com/2.2/questions?${
          page ? `page=${page}&` : ""
        }site=stackoverflow&order=desc&sort=hot&tagged=reactjs`
      );
      const result = await response.json();

      if (result) {
        setQuestions(result.items);
        setHasMore(result.has_more);
        setLoading(false);
      }
    }

    fetchData();
  }, [page]);

  return (
    <QuestionsContainer>
      <h2>Questions</h2>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          {questions.map((question) => (
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
      )}
    </QuestionsContainer>
  );
}
