import re
import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

PAGES = [
    {
        "name": "Home Page",
        "url": "https://ilaaindia.com/"
    },
    {
        "name": "Privacy Policy",
        "url": "https://ilaaindia.com/pages/privacy-policy.html"
    },
    {
        "name": "Terms of Use",
        "url": "https://ilaaindia.com/pages/terms-of-use.html"
    }
]

def clean_page_text(html):
    soup = BeautifulSoup(html, 'html.parser')
    
    # Remove scripts, styles, noscript, svg
    for tag in soup(['script', 'style', 'noscript', 'svg']):
        tag.decompose()
        
    text = soup.get_text(separator='\n')
    
    # Clean up lines
    lines = [line.strip() for line in text.splitlines()]
    # Remove consecutive empty lines
    cleaned_lines = []
    prev_empty = False
    for line in lines:
        if line:
            cleaned_lines.append(line)
            prev_empty = False
        elif not prev_empty:
            cleaned_lines.append("")
            prev_empty = True
            
    return "\n".join(cleaned_lines).strip()

def main():
    session = requests.Session()
    session.headers.update(HEADERS)
    
    output_parts = []
    
    output_parts.append("================================================================================")
    output_parts.append("ILAA INDIA (https://ilaaindia.com) - COMPLETE WEBSITE CONTENT")
    output_parts.append("================================================================================\n")
    
    for i, p in enumerate(PAGES, 1):
        url = p['url']
        print(f"Scraping ({i}/{len(PAGES)}): {url}")
        resp = session.get(url, timeout=15)
        resp.encoding = resp.apparent_encoding or 'utf-8'
        
        soup = BeautifulSoup(resp.text, 'html.parser')
        title = soup.title.string.strip() if soup.title and soup.title.string else p['name']
        
        # Meta description if present
        meta_desc = ""
        desc_tag = soup.find('meta', attrs={'name': 'description'}) or soup.find('meta', attrs={'property': 'og:description'})
        if desc_tag and desc_tag.get('content'):
            meta_desc = desc_tag['content'].strip()
            
        content = clean_page_text(resp.text)
        
        part = []
        part.append("=" * 80)
        part.append(f"PAGE {i}: {p['name']}")
        part.append(f"URL: {url}")
        part.append(f"PAGE TITLE: {title}")
        if meta_desc:
            part.append(f"META DESCRIPTION: {meta_desc}")
        part.append("=" * 80 + "\n")
        part.append(content)
        part.append("\n\n")
        
        output_parts.append("\n".join(part))
        
    final_text = "\n".join(output_parts)
    
    with open("content.txt", "w", encoding="utf-8") as f:
        f.write(final_text)
        
    print(f"Successfully saved all pages content to content.txt ({len(final_text)} characters).")

if __name__ == "__main__":
    main()
