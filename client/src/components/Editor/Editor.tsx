import React from 'react'
import SunEditor from 'suneditor-react'
import { font, fontSize, align, list, table, image } from 'suneditor/src/plugins'
import 'suneditor/dist/css/suneditor.min.css'

type EditorProps = {
  name?: string
  content?: string
  onChange?: (content: string) => void
}

export const Editor = React.memo((props: EditorProps) => (
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
      setContents={props.content ?? ''}
      name={props.name ?? ''}
      onBlur={(_, content) => props.onChange && props.onChange(content)}
    />
  </div>
))
