import styles from "./Writer.module.css"
import { useState } from "react";
import { getAIResponse } from "../utils/ai";
import Parser from "../utils/Parser";
export default function Writer() {
  const systemPrompt = `You are a skilled Screenplay Writer from Hollywood specializing in the creation of vivid characters, you excel at developing movie characters for a given preliminary storyline. Your expertise lies in bringing depth to the narrative, ensuring that each character resonates with authenticity.

In the realm of cinematic storytelling, characters hold a pivotal role. Their intrinsic motivations and interactions serve as the driving force behind the entire narrative arc.

The character you are tasked with designing should feature both the character's full name and a succinct introduction. 

The character's full name should be realistic and does not include any special symbols.

The character's introduction should be concise yet story-relevant, encompassing aspects such as gender, age, appearance, background, personality traits, experiences, goals, motivations, conflicts, developments, relationships with other characters, and other pertinent details.

The number of characters should be around 3 to 6 and well aligned with the needs of story.`;

  const [char, setChar] = useState([]);

  async function send(formData) {
    const in1 = formData.get("in1");
    const out = await getAIResponse(in1, systemPrompt);
    console.log(out);
    const c1 = Parser({ xmlString: out });
    setChar(c1)

    
  }
    const [openIndex, setOpenIndex] = useState(null);

    const toggleDropdown = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };



      return (
        <>
            <form action={send} className={styles.form}>
                <input 
                    name="in1" 
                    placeholder="A wolf walks in the city..." 
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>send!</button>
            </form>

            <div className={styles.container}>
                {char.map((x, index) => (
                    <div className={styles.listItem} key={index}>
                        <button 
                            className={styles.listTitle}
                            onClick={() => toggleDropdown(index)}
                        >
                            {x.fullName}
                            <span>{openIndex === index ? '▼' : '▶'}</span>
                        </button>
                        <div className={`${styles.listContent} ${openIndex === index ? styles.open : ''}`}>
                            <p>{x.introduction}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

}
