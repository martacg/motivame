import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Quotes() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {}, []);
  let el = undefined;
  const fetchRandomQuote = () => {
    fetch("./quotes.json", {
      method: "get",
      dataType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "adssads",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        
        //Generamos la frase aleatoria
        
        const state = {
          randomId: null,
          frases: response,
        };

        // Como Math.random genera un número decimal aplicamos Math.floor para redondear al menor entero más cercano
        const random = () => Math.floor(Math.random() * state.frases.length);

        function getRandomItem() {
          const index = random();

          if (state.randomId === index) {
            return getRandomItem();
          }
          return state.frases[index];
        }

        //Pintamos en el HTML
        el = getRandomItem().frase;
        document.getElementById("fraseRandom").innerHTML = el;
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <>
      <header>
        <p>Motivame | Playground </p>
      </header>
      <main>
        <motion.div
          layout
          animate={{
            rotate: [0, 0, 270, 270, 0],
          }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        >
          <motion.p initial={{}} id="fraseRandom">
            Siempre habrá motivos para seguir adelante.
          </motion.p>

          <div>{JSON.stringify(el)}</div>
          {posts && posts.map((post) => <div key={post.id}>{post.frase}</div>)}

          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1 }}
            onClick={fetchRandomQuote}
          >
            {" "}
            {}
            Clic!
          </motion.button>
        </motion.div>
      </main>
      <footer>
        <p>
          &copy; 2022{" "}
          <a href="https://www.martagonzalez.dev">
            Marta González | Desarrollo Frontend
          </a>
        </p>
      </footer>
    </>
  );
}