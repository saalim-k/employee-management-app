import React from 'react';

type PageProps = {
  content: string;
};

const Page: React.FC<PageProps> = ({ content }) => {
  return (
    <div>
      <h1>Samples Page</h1>
      <p>{content}</p>
    </div>
  );
};

export default Page;
