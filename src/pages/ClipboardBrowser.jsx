import TextCopy from "../components/TextCopy/TextCopy";
import HeaderBrowser from "../components/HeaderBrowser/HeaderBrowser";
import Folder from "../components/FolderItems/FolderItems";
import AddCopy from "../components/AddCopy/AddCopy";
import { useCopybox } from "../context/CopyboxContext.jsx";
import PropTypes from "prop-types";
const ClipboardBrowser = ({ onEditItem }) => {
  const { data, isActiveKey, getActiveKey, selectKey, deleteObjectFromKey } =
    useCopybox();
  const indexKey = getActiveKey();
  let arrCopyText = data.find((item) => item.key === indexKey)?.objects || [];
  if (indexKey === "Todos") {
    arrCopyText = data.reduce((acc, item) => acc.concat(item.objects), []);
  }
  return (
    <div className="browser">
      <nav className="browser_nav">
        <HeaderBrowser />
        <Folder
          menuItems={data}
          onGetActive={isActiveKey}
          onSelectActive={selectKey}
        />
      </nav>
      <div className="browser_content">
        {arrCopyText.map((obj, index) => {
          if (obj.type === "text") {
            return (
              <TextCopy
                key={data + index}
                title={obj.text}
                valueCopy={obj.value}
                onUpdate={() => onEditItem(obj)}
                onDelete={() => deleteObjectFromKey(obj.key, index)}
              />
            );
          }
          return null;
        })}
      </div>
      <AddCopy link="/clipboard-creator" />
    </div>
  );
};
ClipboardBrowser.propTypes = {
  onEditItem: PropTypes.func.isRequired,
};
export default ClipboardBrowser;
