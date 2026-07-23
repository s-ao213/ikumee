from html.parser import HTMLParser
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if 'id' in values:
            self.ids.append(values['id'])

failed = False
for rel in ['requester/index.html', 'supporter/index.html']:
    text = (root / rel).read_text(encoding='utf-8')
    parser = Parser(); parser.feed(text)
    targets = re.findall(r"go\('([^']+)'\)", text)
    missing = sorted(set(targets) - set(parser.ids))
    duplicates = sorted({item for item in parser.ids if parser.ids.count(item) > 1})
    print(rel, 'ids=', len(parser.ids), 'missing_targets=', missing, 'duplicate_ids=', duplicates)
    failed |= bool(missing or duplicates)

check_files = ['requester/index.html', 'supporter/index.html', 'video/VIDEO_PLAN.md', 'APP_SPECIFICATION.md']
remaining = [rel for rel in check_files if '地域貢献ポイント' in (root / rel).read_text(encoding='utf-8')]
print('regional_points_remaining=', remaining)
failed |= bool(remaining)
raise SystemExit(1 if failed else 0)
