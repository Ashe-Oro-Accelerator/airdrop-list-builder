/*-
 *
 * Hedera Airdrop List Builder
 *
 * Copyright (C) 2024 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { z } from 'zod';
import dictionary from '@/dictionary/en.json';

export const formSchema = z.object({
  tokenId: z.string().refine((value) => /^0\.0\.\d*$/.test(value), {
    message: dictionary.tokenIdFormatError,
  }),
  accountIds: z.string().refine(
    (value) => {
      const splitValues = value
        .split(/\s*,\s*|\n/)
        .map((item) => item.trim())
        .filter((item) => item);
      return splitValues.every((item) => /^0\.0\.\d*$/.test(item));
    },
    {
      message: dictionary.accountIdsFormatError,
    }
  ),
});
