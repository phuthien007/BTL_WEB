export default async function getMenuData() {
  return [
    {
      category: true,
      title: 'Dashboards',
    },
    {
      title: 'Dashboards',
      key: 'dashboards',
      icon: 'fe fe-home',
      // roles: ['admin'], // set user roles with access to this route
      url: '/public/dashboard',
    },
    {
      category: true,
      title: 'Questions',
    },
    // {
    //   title: 'Questions',
    //   key: 'questions',
    //   icon: 'fa fa-question-circle-o',
    //   children: [
    {
      title: 'All Questions',
      key: 'questionsall',
      icon: 'fa fa-question-circle-o',
      url: '/public/questions/all-questions',
    },
    {
      title: 'Tag Questions',
      key: 'questionstag',
      icon: 'fa fa-tag',
      url: '/public/questions/tag-questions',
    },
    {
      title: 'Ask Questions',
      key: 'questionsask',
      icon: 'fa fa-question-circle',
      url: '/questions/ask-question',
    },
    //   ],
    // },
    // {
    //   category: true,
    //   title: 'Blogs',
    // },
    // {
    //   title: 'Blogs',
    //   key: 'blogs',
    //   icon: 'fa fa-book',
    //   children: [
    //     {
    //       title: 'All Blogs',
    //       key: 'blogsAll',
    //       url: '/public/blogs/all-blogs',
    //     },
    //     {
    //       title: 'Post Blog',
    //       key: 'blogsPost',
    //       url: '/blogs/post-blog',
    //     },
    //   ],
    // },
    {
      category: true,
      title: 'Others',
    },
    {
      title: 'All users',
      key: 'users',
      icon: 'fe fe-users',
      url: '/users/all-users',
    },
  ]
}
