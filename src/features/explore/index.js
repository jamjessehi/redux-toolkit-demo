import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  add as addMessage,
  typingDraft,
  selectMessageDraft,
  cleanDraft
} from "features/layout/messageSlice";

import { messageId as messageIdStorage } from "utils/storageManager";

const autoMessageId = (function() {
  let id = messageIdStorage.getItem() || 0;
  return function() {
    id += 1;
    messageIdStorage.setItem(id);
    return id;
  };
})();

export default () => {
  const draf = useSelector(selectMessageDraft);
  const dispatch = useDispatch();

  function submit(e) {
    e.preventDefault();

    const text = draf.trim();

    if (!text) return;

    const id = autoMessageId();

    dispatch(
      addMessage({
        id,
        text
      })
    );

    dispatch(cleanDraft());
  }

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        value={draf}
        onChange={e => dispatch(typingDraft(e.target.value))}
      />
      <input type="submit" value="send" />
    </form>
  );
};
