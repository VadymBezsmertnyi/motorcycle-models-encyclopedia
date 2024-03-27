import React, { FunctionComponent, useContext } from "react";
import WebView from "react-native-webview";
import qs from "qs";

// providers
import { localesContext } from "../../../../../localization/localization.provider";

// components
import { ModalsSheet } from "../../../../components/ModalsSheet/ModalsSheet";

// styles
import { styles } from "./ModalWebView.styles";

type ModalWebViewProps = {
  brand: string;
  model: string;
  onClose: () => void;
};
export const ModalWebView: FunctionComponent<ModalWebViewProps> = ({
  brand,
  model,
  onClose,
}) => {
  const { i18n } = useContext(localesContext);
  const query = qs.stringify({
    q: `brand ${brand} model ${model}`,
  });
  const uri = `https://www.google.com/search?${query}`;
  return (
    <ModalsSheet
      title={i18n._(`Search {brand} {model}`, { brand, model })}
      isShow
      onClose={onClose}
    >
      <WebView
        source={{ uri }}
        javaScriptEnabled
        domStorageEnabled
        style={styles.webView}
      />
    </ModalsSheet>
  );
};
