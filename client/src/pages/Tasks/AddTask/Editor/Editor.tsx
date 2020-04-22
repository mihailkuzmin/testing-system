import React from 'react'
import SunEditor from 'suneditor-react'
import {
  font,
  fontSize,
  align,
  list,
  table,
  image,
} from 'suneditor/src/plugins'
import 'suneditor/dist/css/suneditor.min.css'

interface EditorProps {
  name?: string
  onChange?: (content: string) => void
}

const defaultState =
  '<p style="font-size: 16px">Добавьте описание задания здесь</p>'

export const Editor = (props: EditorProps) => {
  return (
    <div>
      <SunEditor
        setOptions={{
          plugins: [font, fontSize, align, list, table, image],
          buttonList: [
            [
              'undo',
              'redo',
              'font',
              'fontSize',
              'bold',
              'underline',
              'italic',
              'strike',
              'subscript',
              'superscript',
              'align',
              'list',
              'table',
              'image',
            ],
          ],
        }}
        setContents={defaultState}
        name={props.name}
        onChange={props.onChange}
      />
    </div>
  )
}
