import { db } from "../firebase";
import Link from "next/link";
import { useState } from "react";

export default function Home({ AllCategories }) {
  const [categories, setCategories] = useState(AllCategories);
  const [end, setEnd] = useState(false);
  const loadMore = async () => {
    const last = categories[categories.length - 1];
    const res = await db
      .collection("categories")
      .orderBy("createdAt", "desc")
      .startAfter(new Date(last.createdAt))
      .limit(3)
      .get();
    const newCategories = res.docs.map((docSnap) => {
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toMillis(),
        id: docSnap.id,
      };
    });
    setCategories(categories.concat(newCategories));

    if (newCategories.length < 2) {
      setEnd(true);
    }
  };

  return (
    <div className="center">
      <div className="cards">
        {categories.map((category) => {
          return (
            <div className="card" key={category.createdAt}>
              <div className="card-image">
                <img src={category.imageUrl} />
                <span className="card-title">{category.title}</span>
              </div>
              <div className="card-content">
                <p>{category.body}</p>
              </div>
              <div className="card-action">
                <Link href={`/categories/${category.id}`}>
                  <a>Start Learning</a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {end === false ? (
        <button
          className="btn #263238 blue-grey darken-4"
          onClick={() => loadMore()}
        >
          Load More
        </button>
      ) : (
        <h3>You have reached the end!</h3>
      )}

      <style jsx>
        {`
          .cards {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
          }

          .card {
            max-width: 250px;
            margin: 22px auto;
            border-radius: 10px;
          }

          .card-content p {
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }

          button {
            margin-top: 10px;
          }

          a {
            background-color: #263238 !important;
            color: white !important;
            border: 1px solid #263238;
            border-radius: 10px;
            padding: 10px 15px;
            margin-left: 25px;
          }

          img {
            height: 165px;
          }

          body {
            height: 80vh;
          }

          .card .card-action:last-child {
            border-radius: 0 0 7px 7px !important;
          }

          .card .card-image img {
            border-radius: 7px 7px 0 0 !important;
          }
  
          @media (max-width: 768px) {
            .card {
              max-width: 350px;
            }
            .a {
              margin-left: 25px;
            }
          }
        `}
      </style>
    </div>
  );
}

export async function getServerSideProps(context) {
  const querySnap = await db
    .collection("categories")
    .orderBy("createdAt", "desc")
    .limit(3)
    .get();
  const AllCategories = querySnap.docs.map((docSnap) => {
    return {
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toMillis(),
      id: docSnap.id,
    };
  });

  return {
    props: { AllCategories },
  };
}
