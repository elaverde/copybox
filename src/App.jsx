// src/App.jsx
import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import ClipboardBrowser from "./pages/ClipboardBrowser";
import ClipboardCreator from "./pages/ClipboardCreator";
import FolderCreator from "./pages/FolderCreator";
import { CopyboxProvider } from "./context/CopyboxContext.jsx";
import "./App.css";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  const [isClipboardCreatorOpen, setClipboardCreatorOpen] = useState(false);

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setClipboardCreatorOpen(true);
    window.history.pushState({}, "", "/clipboard-creator");
    window.dispatchEvent(new PopStateEvent("popstate", { state: {} }));
  };

  const handleCloseClipboardCreator = () => {
    setSelectedItem(null);
    setClipboardCreatorOpen(false);
  };

  return (
    <CopyboxProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<ClipboardBrowser onEditItem={handleEditItem} />}
          />
          <Route
            path="/index.html"
            element={<ClipboardBrowser onEditItem={handleEditItem} />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/clipboard-browser"
            element={<ClipboardBrowser onEditItem={handleEditItem} />}
          />
          <Route
            path="/clipboard-creator"
            element={
              <ClipboardCreator
                item={selectedItem}
                onClose={handleCloseClipboardCreator}
              />
            }
          />
          <Route path="/folder-creator" element={<FolderCreator />} />
        </Routes>
      </Router>
    </CopyboxProvider>
  );
}

export default App;
