'use client'
import { Avatar, Badge, Box, Button, Card, Container, Grid, Group, Image, SimpleGrid, Space, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import useStyles from './style';

interface CardProps {
  article: any;
  user: any;
}

export function ContentCard({ article, user }: CardProps) {
  const { classes, theme } = useStyles();
  const laptop = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

  const profile = user.result.metadata.profile
  const stats = user.result.stats


  return (
    <>
      <Space h="xl" />
      <Grid grow>
        <Grid.Col span={laptop ? 12 : 9}>
        <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Card  withBorder p="md" radius={0} className={classes.cardHeader}>
          <Grid grow>
            <Grid.Col span={10}>
              <Title order={2}>
                {article.data.result.title}
              </Title>
              <Space h="md" />
              <Badge color="gray" variant="outline" size="md">comments {article.data.result.children}</Badge>
              <Badge color="gray" variant="outline" ml={10} size="md">votes {article.data.result.stats.total_votes}</Badge>
            </Grid.Col>
            <Grid.Col span={2}>
              <Box
                sx={(theme) => ({
                  backgroundColor: theme.colors.gray[0],
                  textAlign: 'center',
                  borderRadius: theme.radius.md,
                })}
              >
                <Text className={classes.text}>
                  {article.time} MINS READ
                </Text>
                
              </Box>
            </Grid.Col>
          </Grid>
        </Card>
        <Card  withBorder p="md" radius={0} className={classes.card}>
        
            <Container>
            <ReactMarkdown 

            rehypePlugins={[rehypeRaw]}
            
            components={{
              img: ({ node }) => {
                  const image: any = node.properties;

                  return (
                      <div className="image">
                          <Image
                              src={image.src}
                              alt={image.alt}
                              // width="600"
                              // height="300"
                          />
                      </div>
                      );
                  },
              }}
                >
              {article.data.result.body}
              </ReactMarkdown>
            </Container>

        </Card>
        <Card  withBorder p="md" mb={25} radius={0} className={classes.cardFooter}>
        </Card>
        </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={laptop ? 12 : 3}>
        {!laptop && 
              <Card withBorder p="xl" radius="md" className={classes.card}>
                {
                  profile.cover_image ? 
                  <Card.Section sx={{ backgroundImage: `url(${profile.cover_image})`, height: 140 }} />
                  :
                  <Card.Section sx={{ backgroundColor: '#072f37', height: 140 }} />

                }
              <Avatar src={profile.profile_image} size={80} radius={80} mx="auto" mt={-30} className={classes.avatar} />
              <Text align="center" size="lg" weight={500} mt="sm">
                {user.result.name}
              </Text>
              <Text align="center" size="sm" color="dimmed">
                {profile.about}
              </Text>
              <Group mt="md" position="center" spacing={30}>
                <div>
                  <Text align="center" size="lg" weight={500}>
                    {stats.followers}
                  </Text>
                  <Text align="center" size="sm" color="dimmed">
                    Followers
                  </Text>
                </div>
                <div>
                  <Text align="center" size="lg" weight={500}>
                    {stats.following}
                  </Text>
                  <Text align="center" size="sm" color="dimmed">
                    Follows
                  </Text>
                </div>
                <div>
                  <Text align="center" size="lg" weight={500}>
                    {user.result.post_count}
                  </Text>
                  <Text align="center" size="sm" color="dimmed">
                    Posts
                  </Text>
                </div>

              </Group>
              <Button
                fullWidth
                radius="md"
                mt="xl"
                size="md"
                color={theme.colorScheme === 'dark' ? undefined : 'dark'}
              >
                Follow
              </Button>
              </Card>
            }
        </Grid.Col>      
      </Grid>
    
    </>
  );
}
