import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Dropdown, Button } from "react-bootstrap";

import "./styles.css";

export default function App() {
  const [server, setServer] = useState<string | null>(null);
  const [url, setUrl] = useState<string>("");

  const handleChange = (changedFile: File[]) => {
    let fr = new FileReader();
    fr.onload = (e) => {
      let regex = new RegExp("https.+?game_biz=hk4e_(global|cn)", "g");
      let lastUrl = "";
      let matches: RegExpExecArray;
      do {
        matches = regex.exec(e.target.result as string);
        if (matches !== null) {
          lastUrl = matches[0];
        }
      } while (matches !== null);
      setUrl(lastUrl);
    };
    fr.readAsText(changedFile[0], "UTF-8");
  };
  const gamePath: { [key: string]: string } = {
    china: "\\Genshin Impact Game\\YuanShen_Data",
    global: "\\Genshin Impact Game\\GenshinImpact_Data",
  };

  const getPath: () => string = () =>
    gamePath[server.toLowerCase()] + "\\webCaches\\Cache\\Cache_Data\\";

  return (
    <div className="App">
      <div
        style={{
          minWidth: "max-content",
          textAlign: "left",
          marginRight: "auto",
          paddingLeft: "2em",
          paddingTop: "2em",
        }}
      >
        <h1>How to grab Genshin Wish URL manually</h1>
        <h6>
          Source:{" "}
          <a href="https://github.com/jogerj/" rel="noreferrer" target="_blank">
            JogerJ
          </a>
        </h6>
        <ol className="fs-2">
          <li>Open wish history as usual.</li>
          <li>
            <div className="left">
              <Dropdown
                className="align-content-left"
                onSelect={(e) => setServer(e)}
              >
                <Dropdown.Toggle variant="success" id="server-dropdown">
                  {server ?? "Choose a server"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Global">Global</Dropdown.Item>
                  <Dropdown.Item eventKey="China">China</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>

          {server ? (
            <>
              <li>
                <div>
                  Go to the Genshin Impact's folder. <br />
                  You can find this path in your game's launcher:
                </div>
                <div>
                  <img
                    alt="Installation location"
                    src="launcher-location.png"
                  />
                </div>
              </li>
              <li>
                <div>
                  <div>Navigate to this folder in Genshin Impact's folder</div>
                  <div>
                    <textarea
                      className="mono-textarea"
                      readOnly
                      value={getPath()}
                    ></textarea>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(getPath());
                      }}
                    >
                      Click to copy path
                    </Button>
                  </div>
                </div>
              </li>
              <li>
                <p>
                  Drag <code>data_2</code> file to this drop zone below
                </p>
                <FileUploader
                  multiple={true}
                  handleChange={handleChange}
                  name="file"
                />
              </li>
            </>
          ) : (
            <div />
          )}
          {url ? (
            <li>
              <div>
                <a href={url} rel="noreferrer" target="_blank">
                  Here is your link
                </a>
              </div>
              <div>
                <textarea
                  className="mono-textarea"
                  readOnly
                  value={url}
                ></textarea>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(url);
                  }}
                >
                  Click to copy link
                </Button>
              </div>
              <details className="fs-5 w-auto p-2">
                <summary>Troubleshooting</summary>
                <ul>
                  <li>
                    <div>
                      Copy the file somewhere else if Genshin Impact is open.
                    </div>
                  </li>
                  <li>
                    <div>Otherwise close Genshin Impact.</div>
                  </li>
                  <li>
                    <div>
                      If it still doesn't work, close Genshin Impact, delete the{" "}
                      <code>Cache_Data</code> folder and start over.
                    </div>
                  </li>
                </ul>
              </details>
            </li>
          ) : (
            <div />
          )}
        </ol>
      </div>
    </div>
  );
}
