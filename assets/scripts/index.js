// import { val_const } from "./Code_text.js";
//import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

//If you write your own code, remember hex color shortcuts (eg., #fff, #000)
// returned value: (String) rgba(251,175,255,1)
function hexToRgbA(hex, alpha = 1) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      ", " +
      alpha +
      ")"
    );
  }
  throw new Error("Bad Hex");
}

function Title() {
  let input_text = "Title";
  var [title, setTitle] = React.useState(input_text);

  function handleClick() {
    console.log("handleClick");
    setTitle(document.getElementsByName("input_text")[0].value);
    //document.getElementById("updated").innerHTML = input_text;
  }
  return (
    <>
      <input type="text" name="input_text" />
      <button onClick={handleClick}>Update</button>
      <h1 id="updated">{title}</h1>
    </>
  );
}

function Card_item(props) {
  // className="theme-{props.theme}"

  return (
    <a href={props.href} target="_blank">
      <div
        style={{
          display: "inline-block",
          width: "300px",
          borderRadius: "30px",
          color: "black",
          background: "lightgrey",
          overflow: "hidden",
        }}
      >
        <img
          src={
            props.src
              ? "assets/images/" + props.src
              : "assets/images/formula1.webp"
          }
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
          }}
        />

        <div style={{ margin: "10px 20px" }}>
          {props.children ? props.children : "Card"}
        </div>
      </div>
    </a>
  );
}
function Card_container(props) {
  return (
    <div
      className="container_flex"
      style={{
        width: "100%",
        borderRadius: "10px",
      }}
    >
      {props.children}
    </div>
  );
}
function Social_link(props) {
  return (
    <a href={props.children} target="_blank">
      <img
        style={{
          filter: "grayscale(100%)",
        }}
        src={
          props.src
            ? "assets/images/socials/" + props.src
            : "assets/images/socials/site.png"
        }
      />
    </a>
  );
}
function Socials(props) {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <Social_link>https://e-nta.fr</Social_link>
      <Social_link src="facebook.png">
        https://www.facebook.com/ntackn
      </Social_link>

      <Social_link src="insta.png">
        https://www.instagram.com/ntacv/
      </Social_link>
      <Social_link src="in.png">
        https://www.linkedin.com/in/nathanchoukroun/
      </Social_link>
      <Social_link src="github.png">https://github.com/ntacv</Social_link>
      <Social_link src="codepen.png">https://codepen.io/Natroun</Social_link>
    </div>
  );
}

function Lang_percent(props) {
  return (
    <>
      <div
        style={{
          width: "100%",
          fontFamily: "Courier",
          color: "white",
          background: hexToRgbA(props.color, 0.7), //0.15),
          display: "inline-block",
          padding: "10px 30px",
          position: "relative",
          fontWeight: "bold",

          margin: "20px 0px",
          borderRadius: "20px",
        }}
      >
        <div
          className="back_percent"
          style={{
            background: hexToRgbA(props.color, 1), //0.3),
            width: props.percent + "%",
          }}
        ></div>
        <p style={{}}>{props.children}</p>
      </div>
      <br />
    </>
  );
}
Lang_percent.defaultProps = {
  color: "#3498DB",
  percent: "50",
};

function Lang_list() {
  return (
    <>
      <br />
      <br />
      <Code_text>Languages I learned: </Code_text>
      <br />
      <br />
      <Lang_percent color="#e65127" percent="90">
        &lt;html&gt; pretty much a &lt;master/&gt; &lt;/html&gt;
      </Lang_percent>
      <Lang_percent color="#0c73b8" percent="20">
        .css &#123; experience: intermediate expert; &#125;
      </Lang_percent>
      <Lang_percent color="#f7df1e" percent="50">
        if &#40; javascript &#41; &#123; it is kind of the easiest; &#125;
      </Lang_percent>
      <Lang_percent color="#8d96c0" percent="50">
        &lt;?php&gt; $_GLOBAL['EatCookies'] = "cause it's good"; ?&gt;
      </Lang_percent>
      <Lang_percent color="#0035FF" percent="50">
        from &#40; python &#41; import * ofMyKnowledge
      </Lang_percent>
      <Lang_percent color="#212121" percent="50" lang_code="react">
        function React&#40;&#41; &#123; return "can code this with react" &#125;
      </Lang_percent>
      <Lang_percent color="#813084" percent="50" lang_code="react">
        namespace C# &#123; class public default set static void Main&#40;&#41;
        &#125;
      </Lang_percent>
      <br />
      <br />
      <Code_text>The projects I have done: </Code_text>
      <br />
      <br />
      <br />
      <Card_container>
        <Card_item src="ntacv.png" href="views/recursivness">
          My profil
        </Card_item>
        <Card_item src="exposit.png" href="https://exposit.fr">
          Exposit.fr
        </Card_item>
        <Card_item src="rogererrera.png" href="http://rogererrera.fr">
          RogerErrera.fr
        </Card_item>
        <Card_item src="enta.png" href="https://e-nta.fr">
          Archives
        </Card_item>
        <Card_item src="bobby.jpg" href="">
          Projet mécatronique
        </Card_item>
        <Card_item src="github.png" href="https://github.com/ntacv">
          My <i>not done</i> projects
        </Card_item>
      </Card_container>
      <br />
      <br />
      <Code_text>What I like to do: </Code_text>
      <br />
      <br />
      <br />
      <Card_container>
        <Card_item src="coding.jpg">Coding</Card_item>
        <Card_item
          src="formula1.webp"
          href="https://medium.com/@sergioalbertoromero/why-formula-1-is-the-best-sport-to-watch-6a4035c80672"
        >
          Formula 1
        </Card_item>
        <Card_item src="simracing.jpg">Sim Racing</Card_item>
        <Card_item src="illustrator.webp">Adobe Illustrator</Card_item>
      </Card_container>
      <br />
      <br />
      <Code_text>To contact me: </Code_text>
      <br />
      <br />
      <Socials></Socials>
    </>
  );
}

function Code_text(props) {
  var color_text = props.color ? props.color : "black";
  var color_back = "lightgrey";
  function color_theme(prop) {
    if (prop == "light") {
      return "#ffffff";
    } else {
      return "#000000";
    }
  }
  return (
    <span
      style={{
        color: color_text,
        background: color_back,
        display: "inline-block",
        borderRadius: "10px",
        padding: "1px 10px",
        fontFamily: "Courier",
      }}
    >
      <p>{props.children}</p>
    </span>
  );
}
Code_text.defaultProps = {
  theme: "light",
};

//const app = document.getElementById("app");
//ReactDOM.render(<Title />, app);
const lang_list = document.querySelector(".lang_list");
ReactDOM.render(<Lang_list />, lang_list);
