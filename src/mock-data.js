export const topic = {
  id: 1,
  name: 'Tech',
  imageUrl:
    'https://digitalbarker.com/wp-content/uploads/2019/09/2018-07-10-image-35.jpg',
  slug: 'tech',
  followerCount: 30,
};

export const topics = [
  {
    id: 1,
    name: 'Tech',
    imageUrl:
      'https://digitalbarker.com/wp-content/uploads/2019/09/2018-07-10-image-35.jpg',
    slug: 'tech',
    followerCount: 30,
  },
  {
    id: 2,
    name: 'Finance',
    imageUrl:
      'https://www.wbcsd.org/var/site/storage/images/media/images/finance_img/25992-1-eng-GB/finance_img_i1140.jpg',
    slug: 'finance',
    followerCount: 30,
  },
  {
    id: 2,
    name: 'Politics',
    imageUrl:
      'https://www.wbcsd.org/var/site/storage/images/media/images/finance_img/25992-1-eng-GB/finance_img_i1140.jpg',
    slug: 'politics',
    followerCount: 30,
  },
  {
    id: 2,
    name: 'Sports',
    imageUrl:
      'https://www.wbcsd.org/var/site/storage/images/media/images/finance_img/25992-1-eng-GB/finance_img_i1140.jpg',
    slug: 'sports',
    followerCount: 30,
  },
];

export const feed = [
  {
    comments: [],
    likedBy: [],
    createdAt: 1582122128804,
    updatedAt: 1582122198939,
    id: 2,
    title: 'Public announcement',
    content: 'This is a public announcement',
    slug: 'public-announcement',
    private: false,
    draft: false,
    topic,
    author: {
      createdAt: 1582057187505,
      updatedAt: 1582295056415,
      id: 1,
      name: 'George Kurobara',
      email: 'surplusforreal@gmail.com',
      username: 'changedman',
      slug: 'george-kurobara',
      headline: 'Software Craftsman',
      bio: 'A really soft boy',
      profilePhotoUrl:
        'https://lh6.googleusercontent.com/-oreYI0JA7Yw/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdk3M5DboNPVfg5dgyw4ikm57WcAA/s96-c/photo.jpg',
      emailNotificationSettings: {
        daily: false,
        weekly: true,
        reactions: true,
      },
    },
  },
  {
    comments: [],
    likedBy: [],
    createdAt: 1582122128804,
    updatedAt: 1582122198939,
    id: 3,
    title: 'Taking over the world',
    content: 'My darling you and i will tae over the world one step at a time',
    slug: 'taking-over-the-world',
    private: false,
    draft: false,
    topic,
    author: {
      createdAt: 1582057187505,
      updatedAt: 1582295056415,
      id: 1,
      name: 'George Kurobara',
      email: 'surplusforreal@gmail.com',
      username: 'changedman',
      slug: 'george-kurobara',
      headline: 'Software Craftsman',
      bio: 'A really soft boy',
      profilePhotoUrl:
        'https://lh6.googleusercontent.com/-oreYI0JA7Yw/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdk3M5DboNPVfg5dgyw4ikm57WcAA/s96-c/photo.jpg',
      emailNotificationSettings: {
        daily: false,
        weekly: true,
        reactions: true,
      },
    },
  },
];

export const user = {
  createdAt: 1582057187505,
  updatedAt: 1582295056415,
  id: 1,
  name: 'George Kurobara',
  email: 'surplusforreal@gmail.com',
  username: 'changedman',
  slug: 'george-kurobara',
  headline: 'Software Craftsman',
  bio: 'A really soft boy',
  profilePhotoUrl:
    'https://lh6.googleusercontent.com/-oreYI0JA7Yw/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdk3M5DboNPVfg5dgyw4ikm57WcAA/s96-c/photo.jpg',
  emailNotificationSettings: {
    daily: false,
    weekly: true,
    reactions: true,
  },
};
export const user2 = {
  createdAt: 1582057187505,
  updatedAt: 1582295056415,
  id: 1,
  name: 'Ada James',
  email: 'agaj@gmail.com',
  username: 'adaj',
  slug: 'ada-james',
  headline: 'Software Craftsman',
  bio: 'A really soft boy',
  profilePhotoUrl:
    'https://lh3.googleusercontent.com/GBV8S-ps_TSQ9QddpX-E5oLcOF07nkwN4Bv7lg0YCGxG_b4wfm9jGVPXss_s9J0z8EGXteazZUXz60iZS7-kA97d',
  emailNotificationSettings: {
    daily: false,
    weekly: true,
    reactions: true,
  },
};

export const notifications = [
  {
    id: 1,
    actionType: 'NEW_STORY',
    forUser: user,
    topic: topic,
    story: feed[0],
    fromUser: user2,
  },
  {
    id: 1,
    actionType: 'NEW_STORY',
    forUser: user,
    topic: topic,
    story: feed[0],
    fromUser: user2,
  },
  {
    id: 1,
    actionType: 'NEW_STORY',
    forUser: user,
    topic: topic,
    story: feed[0],
    fromUser: user2,
  },
];
