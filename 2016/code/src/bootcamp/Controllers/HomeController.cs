using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Newtonsoft.Json;
using bootcamp.Models;
using System.Net;
using System.IO;
using System.Net.Http;
using Microsoft.Extensions.OptionsModel;
using Microsoft.Extensions.Configuration;
using System.Diagnostics;
using bootcamp.Utilities;

namespace bootcamp.Controllers
{
    public class HomeController : Controller
    {
        private IOptions<AppSettings> Configuration;

        public HomeController(IOptions<AppSettings> configuration)
        {
            Configuration = configuration;
        }
        public async Task<IActionResult> Index(string proxyUrl)
        {
            var appSettings = Configuration.Value;
            string location = appSettings.Location;

            LocationInfo locationInfo = null;
            try
            {
                if (!string.IsNullOrEmpty(location))
                {

                    if (!string.IsNullOrEmpty(proxyUrl))
                    {
                        var url = string.Format(proxyUrl, location.ToLowerInvariant());
                        using (HttpClient client = new HttpClient())
                        using (HttpResponseMessage response = await client.GetAsync(url))
                        using (HttpContent content = response.Content)
                        {
                            var contents = await content.ReadAsStringAsync();
                            locationInfo = JsonConvert.DeserializeObject<LocationInfo>(contents);
                        }

                    }
                    else
                    {
                        var url = $"{location.ToLowerInvariant()}/data.json";
                        if (System.IO.File.Exists(url))
                        {
                            var contents = System.IO.File.ReadAllText(url);
                            locationInfo = JsonConvert.DeserializeObject<LocationInfo>(contents);
                        }
                        else
                        {
                            throw new FileNotFoundException("File not found at: " + url);
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                return RedirectToAction("Error");
            }

            return View(locationInfo);

        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
