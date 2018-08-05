from django.shortcuts import render

def all_urls_view(request):
    from qnaproject.urls import urlpatterns #this import should be inside the function to avoid an import loop
    nice_urls = get_urls(urlpatterns) #build the list of urls recursively and then sort it alphabetically
    return render(request, "links.html", {"links":nice_urls})

def get_urls(raw_urls, nice_urls=[], urlbase=''):
    '''Recursively builds a list of all the urls in the current project and the name of their associated view'''
    from operator import itemgetter
    for entry in raw_urls:
        if hasattr(entry,'regex'):
            fullurl = (urlbase + entry.regex.pattern).replace('^','/').replace("//","/")
        else:
            fullurl = (urlbase + str(entry.pattern)).replace('^','/').replace("//","/")
        if entry.callback: #if it points to a view
            nice_urls.append({"pattern": fullurl})
        else: #if it points to another urlconf, recur!
            if "admin" not in fullurl:
                get_urls(entry.url_patterns, nice_urls, fullurl)
    nice_urls = sorted(nice_urls, key=itemgetter('pattern')) #sort alphabetically
    return nice_urls