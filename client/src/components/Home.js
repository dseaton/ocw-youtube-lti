import React from 'react';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import './Home.scss';

export default function Home() {
    return (
      <main className="home">
        <TextField
          className="home__search"
          outlined
          placeholder="Find educational videos from across MIT"
        />
        <Button label="Search" unelevated />
      </main>
    );
}
