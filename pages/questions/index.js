import Link from "next/link";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../../components/Card";

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

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://api.stackexchange.com/2.2/questions?site=stackoverflow&order=desc&sort=hot&tagged=reactjs"
      );
      const result = await response.json();

      if (result) {
        setQuestions(result.items);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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
        </>
      )}
    </QuestionsContainer>
  );
}
