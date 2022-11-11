const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql(`
        {
            allGhostPost(sort: { order: ASC, fields: published_at }) {
                edges {
                    node {
                        primary_tag{
                            slug
                        }
                        slug
                        title
                        year: published_at(formatString: "YYYY")
                        month: published_at(formatString: "MM")
                    }
                }
            }
            allGhostTag(sort: { order: ASC, fields: name }) {
                edges {
                    node {
                        slug
                        url
                        postCount
                    }
                }
            }
            allGhostAuthor(sort: { order: ASC, fields: name }) {
                edges {
                    node {
                        slug
                        url
                        postCount
                    }
                }
            }
            allGhostPage(sort: { order: ASC, fields: published_at }) {
                edges {
                    node {
                        slug
                        url
                    }
                }
            }
        }
    `);

    // Check for any errors
    if (result.errors) {
        throw new Error(result.errors);
    }

    // Extract query results
    const tags = result.data.allGhostTag.edges;
    const authors = result.data.allGhostAuthor.edges;
    const pages = result.data.allGhostPage.edges;
    const posts = result.data.allGhostPost.edges;

    // Extract yearArray and year/monthArray , generate postcounts from each year and year/month
    const years = new Set();
    const yearMonths = new Set();
    const PostCounts = {};

    posts.forEach(( post ) => {
        const { year, month } = post.node;
        const yearMonth = (`${year}/${month}`);

        if (! PostCounts.hasOwnProperty(year)) PostCounts[year] = 0;
        if (! PostCounts.hasOwnProperty(yearMonth)) PostCounts[yearMonth] = 0;
        
        PostCounts[year] += 1;
        PostCounts[yearMonth] += 1;
      
        years.add(year);
        yearMonths.add(`${year}/${month}`);
    });
    
    const yearArray = Array.from(years)
    const yearMonthArray = Array.from(yearMonths);

    // Load templates
    const archiveTemplate = path.resolve('src/templates/archive.js');
    const indexTemplate = path.resolve(`./src/templates/index.js`);
    const tagsTemplate = path.resolve(`./src/templates/tag.js`);
    const authorTemplate = path.resolve(`./src/templates/author.js`);
    const pageTemplate = path.resolve(`./src/templates/page.js`);
    const postTemplate = path.resolve(`./src/templates/post.js`);

    // Create tag pages
    tags.forEach(({ node }) => {
        createPage({
            path: `/tag/${node.slug}`,
            component: tagsTemplate,
            context: {
                slug: node.slug,
            }
          });
    });

    // Create author pages
    authors.forEach(({ node }) => {
        createPage({
            path:  `/author/${node.slug}`,
            component: authorTemplate,
            context: {
                slug: node.slug,
            },
        });
    });

    // Create pages
    pages.forEach(({ node }) => {
        createPage({
            path:  `/${node.slug}/`,
            component: pageTemplate,
            context: {
                slug: node.slug,
                years: yearArray,
                yearMonths: yearMonthArray,
                PostCounts: PostCounts,
            },
        });
    });

    // Create post pages
    posts.forEach(({ node }, index) => {
        
        const prev = index === 0 ? false : posts[index - 1].node
        const next = index === posts.length - 1 ? false : posts[index + 1].node

        createPage({
            path: `/post/${node.slug}`,
            component: postTemplate,
            context: {
                slug: node.slug,
                tag: node.primary_tag.slug,
                prev,
                next
            },
        })
    });

    // Create archive 
    yearArray.forEach((year, index) => {

        const prevyear = index === 0 ? false : yearArray[index - 1]
        const nextyear = index ===  yearArray.length - 1 ? false : yearArray[index + 1]

        createPage({
            path: `/archive/${year}/`,
            component: archiveTemplate,
            context: {
            years: yearArray,
            yearMonths: yearMonthArray,
            currentyear: year,
            nextyear:nextyear,
            prevyear:prevyear,
            periodStartDate: `${year}-01-01T00:00:00.000Z`,
            periodEndDate: `${year}-12-31T23:59:59.999Z`,
            PostCounts: PostCounts,
            }
        });
        });

    yearMonthArray.forEach((yearMonth, index) => {
        //set existing year year/month, and also do the around
        const [year, month] = yearMonth.split('/')
        const startDate = `${year}-${month}-01T00:00:00.000Z`;
        const newStartDate = new Date(startDate);

        const endDate = new Date(
            new Date(newStartDate.setMonth(newStartDate.getMonth() + 1)).getTime() -
            1
        ).toISOString();

        const prevyearmonth = index === 0 ? false : yearMonthArray[index - 1]
        const nextyearmonth = index === yearMonthArray.length - 1 ? false : yearMonthArray[index + 1]
        
        createPage({
            path: `/archive/${year}/${month}/`,
            component: archiveTemplate,
            context: {
            years: yearArray,
            yearMonths: yearMonthArray,
            currentyear: year,
            currentmonth: month,
            prevyearmonth: prevyearmonth,
            nextyearmonth: nextyearmonth,
            periodStartDate: startDate,
            periodEndDate: endDate,
            PostCounts: PostCounts,
            }
        });
        });

    // Create index
    createPage({
        path: `/`,
        component: indexTemplate,
        context: {
            years: yearArray,
            yearMonths: yearMonthArray,
            PostCounts: PostCounts,
        },
    });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
    actions.setWebpackConfig({
        resolve: {
            fallback: { url: require.resolve("url/") },
        },
    });
};
