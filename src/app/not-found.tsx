/**
 * It provides a clear message that the page is not found and offers a link to return to the home page.
 * This component is displayed when a user navigates to a route that does not exist in the application.
 * Styles are applied inline for direct manipulation and visibility of layout adjustments.
*/

/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import { CSSProperties } from "react";

/**
 * Styles for the NotFound component.
 */
const styles: { [key: string]: CSSProperties } = {
  /**
   * Styles for the container element.
   */
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "left",
  },
  /**
   * Styles for the inner container element.
   */
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  /**
   * Styles for the header element.
   */
  header: {
    fontSize: "6em",
    margin: "0 0 -0.4em 0",
  },
  /**
   * Styles for the subheader element.
   */
  subHeader: {
    fontSize: "2em",
    margin: "0 0 0.1em 0",
  },
  /**
   * Styles for the text element.
   */
  text: {
    margin: "0 0 2em 0",
  },
};

/**
 * Renders the NotFound component.
 * This component is displayed when a user navigates to a page that does not exist.
 * It provides a message and a link to go back to the home page.
 */
export default function NotFound() {
  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <h1 style={styles.header}>SORRY</h1>
        <h2 style={styles.subHeader}>We couldn't find that page</h2>
        <h3 style={styles.text}>
          Please go back to <a href="/">Savin'IT Home Page</a>.
        </h3>
        <Image
          src="/not-found.png"
          alt="Not Found"
          width={426.5}
          height={640}
          style={{ marginLeft: "-6vw" }}
        />
      </div>
    </div>
  );
}

/**
 * Comments generated with GitHub Copilot.
 */
