'use client'
import { AspectRatio, Avatar, Badge, Button, Card, Container, Grid, Image, Space, Text } from '@mantine/core';
import { IconHeart, IconMessage } from '@tabler/icons';
import Link from 'next/link';
import useStyles from './style';

interface CardProps {
  article: any;
}

export function DirectCard({ article }: CardProps) {

    const { classes } = useStyles();
    const date = new Date(article.created);
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
  
    let forbiddenChars = ["!", "<", ">","[","]"];
    let myString = article.body;
    let words = myString.split(" ");
    let newWords = words.filter(function(word: string) {
        return !word.split('').some(function(char: string) {
            return forbiddenChars.includes(char);
        });
    });
  
    let bodyOfArticle = newWords.join(" ");

    let imageExists

    if (Array.isArray(article.json_metadata.image) && article.json_metadata.image.length === 0) {
        imageExists = false
      } else if (!Array.isArray(article.json_metadata.image)) {
        imageExists = false
      } else {
        imageExists = true
      }  

  return (
    <Card key={article.post_id} withBorder p="md" radius={0} component="a" href="#" className={classes.card}>
        <Grid grow>
          <Grid.Col span={7}>
            <Container className={classes.headerContainer}>
              <Avatar color="blue" radius="xl" src={`https://images.hive.blog/u/${article?.author}/avatar`}/>
              <Badge ml={10} color="dark" variant="outline">{article.author_reputation.toFixed()} lvl</Badge>
              <Text pl={10} color="dimmed" size="xs" transform="uppercase" weight={500}>
                {article?.author} - {formattedDate}
              </Text>       
            </Container>
            <Link href={'post/' + article.permlink} className={classes.link}>
            <Container>
              <Text className={classes.title} mt={5}>
                {article?.title}
              </Text>
              <Text color="dimmed" size="sm" weight={600}  mt={10} className={classes.turncate}>
                {bodyOfArticle}
              </Text>
            </Container>
            </Link>
          </Grid.Col>  
          <Grid.Col span={5}>
            <Container >
              <AspectRatio ratio={4/3}>
              {  imageExists ? 
                  <Image radius={10}  src={article.json_metadata.image[0]} /> :
                  <Image
                    src={null}
                    alt="Image placeholder"
                    withPlaceholder
                    radius={10}
                    height={100}
                  />
              }
              </AspectRatio>
            </Container>
          </Grid.Col>
          <Grid.Col span={7}>
          <Container>
                <Button variant="outline" color="gray" radius="md" size="xs" uppercase>
                {article?.json_metadata.tags[0]}
                </Button>
            </Container>
          </Grid.Col>
          <Grid.Col span={5} display="flex">
          <Container mr={0} className={classes.metadataContainer}>
              <IconHeart color="grey" size={14}/>
              <Text color="dimmed"  className={classes.price}>
                {article?.active_votes.length}
              </Text>
              <Space w="sm" />
              <IconMessage color="grey" size={14}/>
              <Text color="dimmed"  className={classes.price}>
               {article?.children}
              </Text>
              <Space w="sm" />
              <Text color="dimmed"  className={classes.price}>
                {article?.pending_payout_value}
              </Text>
            </Container>
          </Grid.Col>
        </Grid>
      </Card>
  );
}
