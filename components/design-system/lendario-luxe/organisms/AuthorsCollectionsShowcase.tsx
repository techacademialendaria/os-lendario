/**
 * AuthorsCollectionsShowcase - AuthorCard and CollectionCard demos
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AuthorCard from '@/components/books/ui/AuthorCard';
import CollectionCard from '@/components/books/ui/CollectionCard';
import { MOCK_AUTHOR, MOCK_AUTHOR_2, MOCK_COLLECTION, MOCK_COLLECTION_2 } from '../data';

export const AuthorsCollectionsShowcase: React.FC = () => {
  return (
    <>
      {/* AuthorCard */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>AuthorCard</CardTitle>
            <CardDescription>
              <code>components/books/ui/AuthorCard.tsx</code> — Avatar com ring, hover gold
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <AuthorCard author={MOCK_AUTHOR} onClick={() => {}} />
              <AuthorCard author={MOCK_AUTHOR_2} onClick={() => {}} />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CollectionCard */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>CollectionCard</CardTitle>
            <CardDescription>
              <code>components/books/ui/CollectionCard.tsx</code> — Stack effect, glow on hover
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <CollectionCard collection={MOCK_COLLECTION} />
              <CollectionCard collection={MOCK_COLLECTION_2} />
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};
