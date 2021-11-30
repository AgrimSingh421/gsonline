import { useState } from "react";
import { db } from "../../firebase";
import { useRouter } from "next/router";

export default function categorypage({ category, user, allQuesAns }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [allQuesAnsBlog, setAllQuesAnsBlog] = useState(allQuesAns);
  const router = useRouter();
  const { categoryid } = router.query;

  const addQuesAns = async () => {
    await db
      .collection("categories")
      .doc(categoryid)
      .collection("quesAns")
      .add({
        question: question,
        answer: answer,
        name: user.displayName,
      });

    const quesAnsQuery = await db
      .collection("categories")
      .doc(categoryid)
      .collection("quesAns")
      .get();

    setAllQuesAnsBlog(
      quesAnsQuery.docs.map((quesAnsSnap) => quesAnsSnap.data())
    );
    setQuestion("");
    setAnswer("");
  };
  return (
    <div className="container center">
      <h4 className="center">{category.title}</h4>
      <img src={category.imageUrl} alt={category.title} />
      <p>{category.body}</p>

      {user ? (
        <>
          <div className="input-field">
            <input
              type="text"
              placeholder="Enter The Question (Question Mark Necessary)"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter The Answer (Full Stop Necessary)"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <button
            className="btn #263238 blue-grey darken-4"
            onClick={() => addQuesAns()}
            disabled={!question || !answer}
          >
            Submit
          </button>
        </>
      ) : (
        <h5>Read and Improve your GS</h5>
      )}

      <hr />

      <div className="left-align" style={{ paddingBottom: "50px" }}>
        {allQuesAnsBlog.map((item) => {
          return (
            <h6 key={Math.random() * 100}>
              <span>Question:-</span> {item.question} <br />{" "}
              <span>Answer:-</span> {item.answer}
            </h6>
          );
        })}
      </div>

      <style jsx global>
        {`
          span {
            font-weight: 500;
            margin-bottom: 2px;
            color: red;
          }

          body {
            color: #263238;
            height: 80vh;
          }

          img {
            width: 100%;
            max-width: 500px;
          }

          h6 {
            border: 1px solid green;
            border-radius: 10px;
            background: #81ecec;
            padding: 5px;
            margin-bottom: 10px;
            box-shadow: 2px 3px 7px 1px rgba(0,0,0,0.75);
          }


        `}
      </style>
    </div>
  );
}

export async function getServerSideProps({ params: { categoryid } }) {
  const result = await db.collection("categories").doc(categoryid).get();
  const allQuesAnsSnap = await db
    .collection("categories")
    .doc(categoryid)
    .collection("quesAns")
    .get();

  const allQuesAns = allQuesAnsSnap.docs.map((quesAnsDocSnap) =>
    quesAnsDocSnap.data()
  );
  return {
    props: {
      category: {
        ...result.data(),
        createdAt: result.data().createdAt.toMillis(),
      },
      allQuesAns,
    },
  };
}
