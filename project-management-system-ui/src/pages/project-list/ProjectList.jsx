import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CategoryList, TagsList } from '@/constants/ProjectListConsts'
import { MagnifyingGlassIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'
import ProjectCard from '../project/ProjectCard'

const ProjectList = () => {

  const [keyword, setKeyword] = useState("");

  const handleFileterChange = (filterType, value) => {
    console.log(`Filter Type: ${filterType}, Value: ${value}`)
  }

  const handleSearchChange = (e) => {
    const searchValue = e.target.value
    setKeyword(searchValue);
  }

  return (
    <>
      <div className='relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5 dark'>
        <section className='filterSection'>
          <Card className="p-5 sticky top-10">
            <div className="flex justify-between lg:w-[20rem]">
              <p className='text-xl -tracking-wider'>Filters</p>
              <Button variant="ghost" size="icon">
                <MixerHorizontalIcon className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="mt-5">
              <ScrollArea className='space-y-7 h-[70vh]'>
                <div>
                  <h1 className='pb-3 text-gray-400 border-b'>Category</h1>
                  <div className='pt-5 '>
                    <RadioGroup
                      defaultValue='all'
                      onValueChange={(value) => handleFileterChange("category", value)}
                      className="space-y-1"
                    >
                      {
                        CategoryList.map((category, idx) => (
                          <div key={category.value} className='flex gap-2 items-center'>
                            <RadioGroupItem value={category.value} id={`category${idx}`} />
                            <Label htmlFor="category1">{category.lable}</Label>
                          </div>
                        ))
                      }
                    </RadioGroup>
                  </div>
                </div>
                <div className='pt-9'>
                  <h1 className='pb-3 text-gray-400 border-b'>Tags</h1>
                  <div className='pt-5 '>
                    <RadioGroup
                      defaultValue='all'
                      onValueChange={(value) => handleFileterChange("tags", value)}
                      className="space-y-1"
                    >
                      {
                        TagsList.map((tag, idx) => (
                          <div key={tag.value} className='flex gap-2 items-center'>
                            <RadioGroupItem value={tag.value} id={`category${idx}`} />
                            <Label htmlFor="category1">{tag.lable}</Label>
                          </div>
                        ))
                      }
                    </RadioGroup>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>

        <search className='projectListSection w-full lg:w-[40rem]'>
          <div className='flex gap-2 items-center pb-5 justify-between'>
            <div className='relative p-0 w-full text-white'>
              <Input
                className="w-[40%] px-9"
                placeholder="Search Projects..."
                onChange={handleSearchChange}
              />
              <MagnifyingGlassIcon className='absolute top-3 left-4' />
            </div>
          </div>
          <div>
            <div className='space-y-5 min-h-[75vh]'>
              {
                keyword ? 
                  [1, 1, 1].map(item => <ProjectCard key={item} />) :
                  [1,1,1].map(item => <div key={item}>okndfgd </div>)
              }
            </div>
          </div>
        </search>
      </div>
    </>
  )
}

export default ProjectList