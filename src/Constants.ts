import Path from 'path'
import { HttpMethod } from './Types'

export const DEFAULT_CONTROLLERS_DIR = Path.resolve('./src/Api/Controllers')

export const HTTP_METHODS: HttpMethod[] = [
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'head',
]
