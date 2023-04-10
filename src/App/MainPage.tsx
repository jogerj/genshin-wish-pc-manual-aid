import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Dropdown, Button } from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem"


import "./MainPage.css";

enum UrlState {
  INIT,
  NOT_FOUND,
  FOUND,
}

export default function MainPage() {
  const [server, setServer] = useState<string | undefined>(undefined);
  const [urlState, setUrlState] = useState<UrlState>(UrlState.INIT);
  const [url, setUrl] = useState<string>("");

  const regex = new RegExp("https.+?game_biz=hk4e_(global|cn)", "g");
  const handleChange = (changedFile: File) => {
    const fr = new FileReader();
    fr.onload = (e) => {
      let matches: RegExpExecArray | null;
      setUrlState(UrlState.NOT_FOUND);
      do {
        matches = regex.exec(e?.target?.result as string);
        if (matches !== null) {
          setUrl(matches[0])
          setUrlState(UrlState.FOUND);
        }
      } while (matches !== null);
    };
    fr.readAsText(changedFile, "UTF-8");
  };
  const gamePath: Map<string | undefined, string> = new Map([
    ["china", "\\Genshin Impact Game\\YuanShen_Data"],
    ["global", "\\Genshin Impact Game\\GenshinImpact_Data"],
  ]);

  const getPath: () => string = () =>
    gamePath.get(server?.toLowerCase()) + "\\webCaches\\Cache\\Cache_Data\\";

  const renderTroubleshooting = () => {
    return (
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
    )
  }

  const renderSearchResult = () => {
    switch (urlState) {
      case UrlState.INIT:
        return <div />;
      case UrlState.NOT_FOUND:
        return (
          <div>
            <div className="text-danger">URL not found!</div>
          </div>
        );
      case UrlState.FOUND:
        return (
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
            </div>
            <div>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(url);
                }}
              >
                Click to copy link
              </Button>
            </div>
          </li>
        );
    };
  }

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
          <a href="https://github.com/jogerj/genshin-wish-pc-manual-aid" rel="noreferrer" target="_blank">
            JogerJ
          </a>
        </h6>
        <ol className="fs-2">
          <li>Open wish history as usual.</li>
          <li>
            <div className="left">
              <Dropdown
                id="server-dropdown"
                className="align-content-left"
                onSelect={(e) => e ? setServer(e) : undefined}
              >
                <Dropdown.Toggle id="server-dropdown-toggle">
                  {server ?? "Choose a server"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <DropdownItem eventKey="Global">Global</DropdownItem>
                  <DropdownItem eventKey="China">China</DropdownItem>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>

          {server ? (
            <>
              <li>
                <div>
                  Go to the Genshin Impact's folder. <br />
                  You can find this path in your game's launcher.
                </div>
                <div>
                  <img
                    alt=""
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
                  </div>
                  <div>
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
                  multiple={false}
                  handleChange={handleChange}
                  name="file"
                />
              </li>
              {renderSearchResult()}
              <div>{renderTroubleshooting()}</div>
            </>
          ) : (
            <div />
          )}
        </ol >
      </div >
    </div >
  );
}
