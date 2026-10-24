/**
 * Sets <html data-view> before first paint, from ?view= or the last choice,
 * so the right content shows without a flash.
 */
const script = `(function(){document.documentElement.classList.add("js");try{var v=new URLSearchParams(location.search).get("view");if(v!=="engineer"&&v!=="recruiter"){v=localStorage.getItem("view")}if(v==="engineer"||v==="recruiter"){document.documentElement.dataset.view=v}}catch(e){}})();`;

export function ViewScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
