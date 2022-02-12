import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div className="intro">
        <div className="about">
          This application allows a user to search for books by genres or
          categories. When a search is implemented a list of books is fetched
          from the Open Library book API. By using the book's ISBN codes a
          search is immediately conducted on the Google books API in order to
          fetch the information missing in the first call, such as, images a
          short extract and links
        </div>
        <div className="details">
          OpenLibrary.org is an open source project. Open Library offers free,
          public, low-volume Web APIs and bulk Monthly Data Dumps for accessing
          book and author catalog data. Our Web APIs are ideal for book services
          which need to make infrequent, real-time searches for specific books,
          their authors, and their availability. For projects which require
          importing books, authors, or covers in bulk, please kindly download
          our free data dumps.
        </div>
      </div>
      <div className="links">
        <Link className="home-button" to="/registration">
          Login
        </Link>
        <a
          className="home-button"
          href="https://openlibrary.org/"
          target="_blank"
        >
          Open Library
        </a>
        <a
          className="home-button"
          href="https://books.google.com/"
          target="_blank"
        >
          Google Books
        </a>
      </div>
      <div className="about">
        <p>
          Genre is any form or type of communication in any mode (written,
          spoken, digital, artistic, etc.) with socially-agreed-upon conventions
          developed over time. In popular usage, it normally describes a
          category of literature, music, or other forms of art or entertainment,
          whether written or spoken, audio or visual, based on some set of
          stylistic criteria, yet genres can be aesthetic, rhetorical,
          communicative, or functional. Genres form by conventions that change
          over time as cultures invent new genres and discontinue the use of old
          ones. Often, works fit into multiple genres by way of borrowing and
          recombining these conventions. Stand-alone texts, works, or pieces of
          communication may have individual styles, but genres are amalgams of
          these texts based on agreed-upon or socially inferred conventions.
          Some genres may have rigid, strictly adhered-to guidelines, while
          others may show great flexibility. Genre began as an absolute
          classification system for ancient Greek literature, as set out in
          Aristotle's Poetics. For Aristotle, poetry (odes, epics, etc.), prose,
          and performance each had specific design features that supported
          appropriate content of each genre. Speech patterns for comedy would
          not be appropriate for tragedy, for example, and even actors were
          restricted to their genre under the assumption that a type of person
          could tell one type of story best.
        </p>

        <p>
          Genres proliferate and develop beyond Aristotle’s classifications in
          response to changes in audiences and creators. Genre has become a
          dynamic tool to help the public make sense out of unpredictability
          through artistic expression. Given that art is often a response to a
          social state, in that people write, paint, sing, dance, and otherwise
          produce art about what they know about, the use of genre as a tool
          must be able to adapt to changing meanings. Genre suffers from the
          ills of any classification system. Musician Ezra LaFleur argues that
          discussion of genre should draw from Ludwig Wittgenstein's idea of
          family resemblance. Genres are helpful labels for communicating but do
          not necessarily have a single attribute that is the essence of the
          genre.
        </p>
      </div>
    </>
  );
};
