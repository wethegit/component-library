import { useState } from "react"

import styles from "./accordion.module.scss"
import AccordionItem from "./component/AccordionItem"

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "aria-label"> {
  /**
   * Mandatory `aria-label` attribute.
   */
  "aria-label": string
  /**
   * A function that toggles the accordion.
   */
  toggle: () => void
  /**
   * The accordion class name.
   */
  className?: string
}

const cards = [
  {
    id: 1,
    header: "Jean-Luc Picard",
    text: `Jean-Luc Picard is a fictional character in the Star Trek franchise, most often seen as the captain of the Federation starship USS Enterprise (NCC-1701-D). Played by Patrick Stewart, Picard has appeared in the television series Star Trek: The Next Generation (TNG) and the premiere episode of Star Trek: Deep Space Nine, as well as the feature films Star Trek Generations (1994), Star Trek: First Contact (1996), Star Trek: Insurrection (1998), and Star Trek: Nemesis (2002). He is also featured as the central character in the show Star Trek: Picard (2020–2023).`,
  },
  {
    id: 2,
    header: "William Riker",
    text: `William Thomas "Will" Riker is a fictional character in the Star Trek universe appearing primarily as a main character in Star Trek: The Next Generation, portrayed by Jonathan Frakes. Throughout the series and its accompanying films, he is the Enterprise's first officer, and briefly captain, until he accepts command of the USS Titan at the end of Star Trek: Nemesis. He is the husband of Deanna Troi.`,
  },
  {
    id: 3,
    header: "Data",
    text: `Data was found by Starfleet in 2338. He was the sole survivor on Omicron Theta in the rubble of a colony left after an attack from the Crystalline Entity. He is a synthetic life form with artificial intelligence, designed and built by Doctor Noonien Soong in his own likeness (likewise portrayed by Spiner). Data is a self-aware, sapient, sentient and anatomically fully functional male android who serves as the second officer and chief operations officer aboard the Federation starship USS Enterprise-D and later the USS Enterprise-E.`,
  },
  {
    id: 4,
    header: "Worf",
    text: `<p>Worf, son of Mogh is a fictional character in the Star Trek franchise, portrayed by actor Michael Dorn. He appears in the television series Star Trek: The Next Generation (TNG), seasons four through seven of Star Trek: Deep Space Nine (DS9) and the third and final season of Star Trek: Picard, as well as the feature films Star Trek Generations (1994), Star Trek: First Contact (1996), Star Trek: Insurrection (1998), and Star Trek: Nemesis (2002).</p>

    <p>Worf has appeared in more Star Trek franchise episodes than any other character. Worf is the best character in the Star Trek universe.</p>

 <p>@@@@%#%@@@@@@@@@@@@@@@@@@@@@@@@%#*****%#%###*%@@@@@@@@@@@@@@@@@@@@@@@@@  
    @%%@@@@@@@@@@@@@@@@@@%*#%%#**=+=**#*#%%%%%%%%***#%@%@@@@@@@@@@@@@@@@@@@  
    %#**%@@@@@@@@@@@@@@@@@@%**==+*#%#****%%@@@@@@@@@%%#%%%@@@@@@@@@@@@@@@@@  
    @@@%@@@@@@@@@@@@@@@@%*===+#%%%%#%###%%##%%%@@@@@@@@%%%##%@@@@@@@@@@@@@@  
    @@%%@@@@@@@@@@@@@@%+===+#%@@%**%%%****#####***#%%@@@@@@@%*#@@@@@@@@@@@@  
    @@@@@@@@@@@@@@@@%*-:=*##%%**=**#%%#***####****##**%%@@@@@@%**%%@@@@%@@@  
    @@@@@@@@@@@%@%#*+:-+***=-+*==**#####*****##%#**######%@@%%%%%*+*@@%**@@  
    @@@@@@@@@@@@@%+=***=+===**==+***###***#****###**###%%%%@@%@@%%=-*@@@@@@  
    @@@@@@@@@@@@%%=-+=-=::==*+===#%***##*****###########%%%%@@@%@@%=:=%@@@@  
    @@@@@@@@@@@@%==*=:-:..:-+====*##=*=********#########%%%%%@@@@%%*-=%@@@@  
    @@@@@@@@@@%%*=-=-=:..:::==+.=****=*********##***###%#%%%%@@@@@%%=:#@%@@  
    @@@@@@@@@@@%*==-.::.:++++**++=****==+*****#****###%%%%%%%%%@@@@%=.=#@@@  
    @@@@@@@@%@@*=+*::=-..-:****=+=****++*******#****#%%%%%%#%@@@@@@%*::=#@@  
    @@@@@@@#@@*:*#%-:+:..:=***=-*=****++************#%%%%##%%@@%%@@@%*:++#@  
    @@@@@@@%@#=+*%#-.=:..:+**=*=**+*=**+***********#%@%%%#%%%%%@@@@@@%+--:%  
    @@@@@@@@%==%%%%=.--.:-=**+*++#*++==+**********#%%%%%##%%%@%%@@@@%%#*::*  
    @@@@@@@@#-*%%%%*:=:.:=*******+**-:===+*******#%%%%%%%%%%%%%%%@@@@%%+=-=  
    @@@@@@@@+.=#%##*-=::=***++*+*+=**==+++++**####%%%%%%%%%%%%%%%@@@@@%*==*  
    @@@@@@@%*:-*###*:===+*****+*#*==+*+==+**######%%@@%%%%%%%%%%%%@@%%%%*:+  
    @@@@@@@%*==*#*%#=*****+******%*++***###%%%%%**#%%@%%%%%%%%%%%@@@@%%%%++  
    %@@%%@@%-:=##%%%*###*###**#*+*%%%%%%%*-=%**%%%#%%%%%%%%@%%%%%@@@@@%%%**  
    @@@@@@@%-:=*%%%%%#%#%*:*%%*:=*#%%@%*====*******###%%%%%%%**%%%%@@@%%%**  
    @@@@@@%%=:=*#%%#%%-:.:+*+==-+*#%%%##*=-===+**##*#%%%%%%%#####%%%%%%##*#  
    @@@@@@%*==*#%%%#%%-..-+++*-:+*#%%%#****++++**####%%%%@@%#*#*#%%@%%%%%**  
    @@@@@@%*==++##*#%%-.:+**=:.=+**#%%%#*+*******###%%%%%@@%%**#%%%%%#%%#*#  
    @@@@@@%*-==*+##%%#=::..:=.:=*+*%#*#%*=++****####%%%%%@@%%####%%%%**%***  
    @@@@%%%=--===*#%#%+...:+**+*#%@@%%%%*+=+***#####%%%%@@@@%##%###%%%##*+#  
    @@@@@%#-:===*##%*##...:+*:::+**+***++******####%%%%%@@@@%%#%%*%%%%%**=*  
    @@@@@@*:-==++*#*#%%+..::-+===++=+*###***#####%%%%%%%@@@@%#%*%#%%#*%****  
    @@@@@@*====*****%%%#:.:+**=+===++*#%%%%%#####%%%#%%%@@@@%%%%#%%%#*#**+*  
    @@@@%%#=+=++*#**#%%%=:=*###*******#%%%%%%%%%#%###%%@@@@@@@%%%%%%%##%+*%  
    @@@@@#%+==+**%#%#%%%*=*#*++=====+***###**%%%%%##%%@@%@@@@@%%%%%#%%*%**%  
    %%@@%#**=-++*%#%%%%%+*-==+*##*********#**##%@%%%%@@%@@@@@@@%%#%%%%%#%*%  
    #*@@%***=+#*#%%%%%%#*%==+*************#%%#%%%%%@@@%%@@@@@@@%%%@%###%%%%  
    @@@@@%%#+#%%%%%%%%%%#%%=*****#%%%%##%%%%%#%%%@@@@%@@@@@@@@@@%%@%##%%@%%  
    @@%%@@%%%*%#%%%%%%%%%%#=*#*+**#%%%%%%%%#%%%%%@@@@%%@@@@@@@@%%%%%#%%#*#%  
    @@@@@@@@%%#%#%%%#%@@%#*=++=*#%%%%%%%%%#%%%@%%@@@@@@@@@@@%%%%@@@%@@@@%%%  
    @@@@@@@@%%%%%@@%%#%%@%*=+=*#%%%%%%%%%%%%%@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    @@@@@@@%@@@@@@@@@%###%%*=**%%%%@%%@@%@%@@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    @@@@@@@@@@@@@@@@@@%*=*++=+***%%%%%@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    @@@@@@@@@@@@@%=*===*+=+*+*%##***%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    @@@@@@@@@@%*=*=-*=++=-==**%=*%*%*##%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    @@@@@@@@*=-=-::=*+**===+*%**-%%#%*%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    @@@@@@*=+=+-:*=**#***+=*#@#*#%%%*#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    @@@@@*:-=-:+=::-*++=:=**%@%####%#%@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%%%%@  
    @@@%#=-::=:==-=+***++=+*@@%##%###%%%%%%%%%%%%%%%%%#***++++++++=+++++++*  
    @%#**-==+==-:.+%+*-==-+#@@%%%*=-===:::-=-=======---:=========++==++===*  
    %***+-=*::==-.*#+=*==+*#*++=:.:==---==========::::-=====+=+===========*  
    %***--=:=.=:-+*#*++=++*+===:::-=====-:=====-:::-=====++=====+========+*  
    *:...:--:-==+*++*=++==-=+===:-====-::====:::::======++=====+=========+*  
    -....--==++=======-====*=========-:::--:::::=====++===+=============+=*  
    -....:+:::-==+====*+==**+========:::::::::-=====:*+=+===+===========++*  
    =....=:===-.-====+-==+**++==+++==:::::::-=====-:.+*================+++%</p>  `,
  },
]

export function Accordion({}: AccordionProps) {
  const [active, setActive] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    console.log("set")
    active === index ? setActive(null) : setActive(index)
  }

  return (
    <div className={styles.accordionGroup}>
      {cards.map((card, index) => {
        return (
          <AccordionItem
            key={index}
            active={active}
            handleToggle={handleToggle}
            card={card}
          />
        )
      })}
    </div>
  )
}
