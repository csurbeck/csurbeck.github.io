'use strict';
(function() {

  window.addEventListener('load', init);

  function init() {
    id("husky-guide").addEventListener("click", function() {
      let projectName = this.id;
      projectName = projectName + "-page";
      changePage(projectName);
    })
    id("winter-research").addEventListener("click", function() {
      let projectName = this.id;
      projectName = projectName + "-page";
      changePage(projectName);
    })
    id("family-tree").addEventListener("click", function() {
      let projectName = this.id;
      projectName = projectName + "-page";
      changePage(projectName);
    })
    id("gallery-curator").addEventListener("click", function() {
      let projectName = this.id;
      projectName = projectName + "-page";
      changePage(projectName);
    })
    // id("light-mode").addEventListener("click", lightMode());
    id("dark-mode").addEventListener("click", darkMode());
  }

  function changePage(pageName) {
    let mainPage = qsa("main > section");
    for (let i = 0; i < mainPage.length; i++) {
      mainPage[i].classList.add('hidden');
    }
    id(pageName).classList.remove('hidden');
    scroll(0,0);
  }

  function darkMode() {
    let purpleText = qsa("header-bar button");
    for (let i = 0; i < purpleText.length; i++) {
      purpleText[i].classList.add('lavender-text');
    }
  }

  /**
   * retrieves an HTML element by ID
   * @param {String} id - the id tag for an element in the HTML
   * @returns {Node} - the element from the HTML document
   */
   function id(id) {
    return document.getElementById(id);
  }

  /**
   * retrieves an HTML element by the selector parameter passed in
   * @param {String} selector - the selector id for elements in the HTML document
   * @returns {Node} - the element from the HTML document
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * retrieves an array of HTML elements that contains the selector parameter passed in
   * @param {String} selector - the selector tag for elements in the HTML document
   * @return {NodeList} - an array with the elements from the HTML document with the selector tag
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }
})()