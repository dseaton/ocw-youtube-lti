import React from 'react';
import './Context.scss';

export default function Context() {
  return (
    <div className="context">
      <p>
        <span className="footer__text-2">Welcome to the OpenCourseWare YouTube LTI Sandbox.</span> 
        <br/>
        We are gathering input from users on how best to integrate OCW into on-campus LMSs. 
        This application is under active development and may be down from time to time. 
        Current features include:
        <ul>
          <li>Search of the OCW YouTube Channel.</li>
          <li>One click embed of an OCW video directly in a Canvas page.</li>
        </ul>
      </p>
      <p>Type a term into the search bar to get started.</p>
    </div>
  );
}
